# WebQuiz-Hub

An interactive quiz website built with HTML, CSS and JavaScript. Pick a topic, answer four questions, and get instant feedback with an explanation for every answer.

**Live site:** https://your-project-name.vercel.app

## Features

- **Three quiz topics:** HTML, CSS and JavaScript, with four questions each.
- **Instant feedback:** the correct answer turns green, a wrong choice turns red, and a short explanation follows.
- **Progress tracking:** a progress bar and question counter, with a final score screen.
- **Best scores:** your best result per topic is saved in the browser using `localStorage` and shown in the Topics section.
- **Contact form:** the "Suggest a question" form validates that all fields are filled in and that the email address is valid, then shows an error or success message.
- **Responsive design:** works on desktop and mobile screens.
- **Accessibility:** keyboard focus styles, labelled form fields, and reduced-motion support.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and form elements |
| CSS3 | Layout (Flexbox and Grid), styling, responsive design |
| JavaScript | Quiz logic, DOM manipulation, form validation, localStorage |
| Google Fonts | Bricolage Grotesque and Inter typefaces |
| GitHub | Version control and source hosting |
| Vercel | Deployment and hosting |

## Project Structure

```
├── index.html    # Page markup
├── style.css     # Styling and responsive layout
├── script.js     # Quiz data, quiz logic and form validation
└── README.md     # Project documentation
```

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Open the project folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or simply open `index.html` in any browser.

No installation or build step is required.

## How It Works

1. The quiz questions are stored in a JavaScript object, grouped by topic.
2. Choosing a topic loads its questions one at a time.
3. Clicking an answer locks the choices, marks the correct one, and shows an explanation.
4. After the last question, the score is displayed and saved as the best score if it is the highest so far.
5. The contact form uses JavaScript to check for empty fields and a valid email format before showing a confirmation.

## Deployment

The site is deployed on Vercel as a static website. The Vercel project is connected to this GitHub repository, so every push to the main branch redeploys the site automatically.

## Author

**Waryam**
Computer Science, Mehran University of Engineering and Technology (MUET), Jamshoro
Web Technologies (CSC-332), Lab 16: Open Ended
