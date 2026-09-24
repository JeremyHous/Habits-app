# Project Instructions

## Project

This is a plain HTML, CSS, and JavaScript habit tracker. Open `index.html` directly in Chrome to run it.

## Stack and Files

- No framework, build step, npm package, or `node_modules` folder.
- `index.html` contains markup only and loads `style.css` and `app.js`.
- `style.css` contains all styles. Do not use inline styles in HTML.
- `app.js` contains all application logic.

## Behavior

- Users can add habits through the text field and Add habit button.
- Each habit is rendered as a list row with a native checkbox and a remove button.
- Checking a habit marks it complete for today and applies the completed-row styling.
- Unchecking a habit removes today's completion state.
- Habits and their completion dates are stored in `localStorage` under `habit-tracker-habits`.
- Deleting a habit removes it from the list and from persisted storage.

## Conventions

- Add a comment above each function explaining what it does.
- Keep the implementation limited to the requested habit-tracker behavior.
- Confirm with the user before adding a new feature or page that was not requested.
- Preserve the three-file structure unless the user explicitly asks for a change.
