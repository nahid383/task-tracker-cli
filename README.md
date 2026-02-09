# Task Tracker CLI

Project Page: [https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)

A simple **Command Line Interface (CLI)** application to track and manage your tasks.  
Built with **Node.js**, this project helps you add, update, delete, and mark tasks as done or in-progress.  

---

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as **in-progress** or **done**
- List all tasks or filter by status (`todo`, `in-progress`, `done`)
- Tasks are stored in a local `tasks.json` file

---

## Usage

Run commands from the project directory using Node.js:

```bash
node task-cli.js add "Buy groceries"
node task-cli.js list
node task-cli.js update 1 "Buy groceries and cook dinner"
node task-cli.js delete 1
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1
