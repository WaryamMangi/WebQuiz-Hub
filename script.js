// ---------- Quiz data ----------
const quizData = {
    html: [
        { q: "Which tag creates a hyperlink?", o: ["<link>", "<a>", "<nav>", "<href>"], a: 1, why: "The <a> (anchor) tag creates links; its href attribute holds the address." },
        { q: "Which attribute gives an image alternative text?", o: ["alt", "title", "src", "caption"], a: 0, why: "The alt attribute is shown if the image fails to load and is read by screen readers." },
        { q: "Which element is the largest heading?", o: ["<h6>", "<head>", "<heading>", "<h1>"], a: 3, why: "Headings run from <h1> (largest) to <h6> (smallest)." },
        { q: "What is the <form> element used for?", o: ["Styling the page", "Collecting user input", "Running scripts", "Adding a footer"], a: 1, why: "A form groups input fields and sends the data when it is submitted." }
    ],
    css: [
        { q: "Which property changes the text colour?", o: ["font-color", "text-style", "color", "foreground"], a: 2, why: "The color property sets the text colour." },
        { q: "Which declaration makes an element a flex container?", o: ["display: flex", "position: flex", "float: flex", "flex: container"], a: 0, why: "display: flex turns the element into a flex container for its children." },
        { q: "In the box model, which layer is outermost?", o: ["Padding", "Border", "Content", "Margin"], a: 3, why: "From inside out: content, padding, border, margin." },
        { q: "Which selector targets the element with id \"menu\"?", o: [".menu", "menu", "#menu", "*menu"], a: 2, why: "# selects by id; a dot selects by class." }
    ],
    js: [
        { q: "Which keyword declares a block-scoped variable?", o: ["var", "let", "define", "dim"], a: 1, why: "let (and const) are block-scoped; var is function-scoped." },
        { q: "What does === compare?", o: ["Value only", "Type only", "Memory address", "Value and type"], a: 3, why: "Strict equality checks both value and type, with no type conversion." },
        { q: "Which method adds an item to the end of an array?", o: ["push()", "pop()", "shift()", "add()"], a: 0, why: "push() appends; pop() removes the last item." },
        { q: "Which method finds an element by its id?", o: ["findElement()", "getElementById()", "queryId()", "selectId()"], a: 1, why: "document.getElementById() returns the element with that id." }
    ]
};
const topicNames = { html: "HTML", css: "CSS", js: "JavaScript" };

// ---------- Elements ----------
const tabs = document.querySelectorAll(".tab");
const quizBody = document.getElementById("quizBody");
const resultBox = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const counterEl = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");

let topic = "html", index = 0, score = 0, answered = false;

// ---------- Best scores (stored in the browser) ----------
function getBest(t) {
    try { return localStorage.getItem("best_" + t); } catch (e) { return null; }
}
function saveBest(t, value) {
    try {
        const old = Number(getBest(t));
        if (getBest(t) === null || value > old) localStorage.setItem("best_" + t, value);
    } catch (e) { /* storage unavailable */ }
}
function showBest() {
    document.querySelectorAll("[data-best]").forEach(function (el) {
        const b = getBest(el.dataset.best);
        el.textContent = b === null ? "No score yet. Take the quiz!" : "Your best: " + b + " / 4";
    });
}

// ---------- Quiz logic ----------
function startQuiz(t) {
    topic = t; index = 0; score = 0;
    tabs.forEach(function (tab) {
        const on = tab.dataset.topic === t;
        tab.classList.toggle("active", on);
        tab.setAttribute("aria-selected", on);
    });
    resultBox.hidden = true;
    quizBody.hidden = false;
    showQuestion();
}

function showQuestion() {
    const item = quizData[topic][index];
    answered = false;
    questionEl.textContent = item.q;
    counterEl.textContent = "Question " + (index + 1) + " of " + quizData[topic].length;
    progressBar.style.width = (index / quizData[topic].length * 100) + "%";
    feedbackEl.textContent = "";
    nextBtn.hidden = true;
    optionsEl.innerHTML = "";
    item.o.forEach(function (text, i) {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = text;
        btn.addEventListener("click", function () { choose(i); });
        optionsEl.appendChild(btn);
    });
}

function choose(i) {
    if (answered) return;
    answered = true;
    const item = quizData[topic][index];
    const buttons = optionsEl.querySelectorAll(".option");
    buttons.forEach(function (b) { b.disabled = true; });
    buttons[item.a].classList.add("correct");
    if (i === item.a) {
        score++;
        feedbackEl.textContent = "Correct. " + item.why;
    } else {
        buttons[i].classList.add("wrong");
        feedbackEl.textContent = "Not quite. " + item.why;
    }
    nextBtn.textContent = index === quizData[topic].length - 1 ? "See my score" : "Next question";
    nextBtn.hidden = false;
}

function showResult() {
    const total = quizData[topic].length;
    quizBody.hidden = true;
    resultBox.hidden = false;
    document.getElementById("scoreText").textContent = score + " / " + total;
    let note = "Good start. Review the explanations and try again.";
    if (score === total) note = "Perfect score in " + topicNames[topic] + "!";
    else if (score >= total / 2) note = "Nice work. One more round for a perfect score?";
    document.getElementById("scoreNote").textContent = note;
    saveBest(topic, score);
    showBest();
}

nextBtn.addEventListener("click", function () {
    index++;
    if (index < quizData[topic].length) showQuestion();
    else showResult();
});
document.getElementById("retryBtn").addEventListener("click", function () { startQuiz(topic); });
tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { startQuiz(tab.dataset.topic); });
});

// ---------- Contact form validation ----------
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const msg = document.getElementById("cMsg").value.trim();
    const out = document.getElementById("formMsg");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !msg) {
        out.className = "error";
        out.textContent = "Please fill in your name, email and question.";
    } else if (!emailOk) {
        out.className = "error";
        out.textContent = "Enter a valid email address, for example name@example.com.";
    } else {
        out.className = "ok";
        out.textContent = "Thanks, " + name + ". Your suggestion has been received.";
        this.reset();
    }
});

// ---------- Start ----------
showBest();
startQuiz("html");
