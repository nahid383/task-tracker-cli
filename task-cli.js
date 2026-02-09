const fs = require("fs");
const path = require("path");

const TASK_FILE = path.join(__dirname, "tasks.json");

function loadTasks() {
    if (!fs.existsSync(TASK_FILE)) return [];
    const data = fs.readFileSync(TASK_FILE, "utf-8");
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 4));
}

function generateId(tasks) {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

function findTask(tasks, id) {
    return tasks.find(task => task.id === id);
}

function addTask(description) {
    const tasks = loadTasks();
    const id = generateId(tasks);
    const now = new Date().toISOString();
    const task = {
        id,
        description,
        status: "todo",
        createdAt: now,
        updatedAt: now
    };
    tasks.push(task);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${id})`);
}

function listTasks(status) {
    let tasks = loadTasks();
    if (status) tasks = tasks.filter(task => task.status === status);
    if (tasks.length === 0) return console.log("No tasks found.");
    tasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.status}`);
    });
}

function updateTask(id, newDescription) {
    const tasks = loadTasks();
    const task = findTask(tasks, id);
    if (!task) return console.log(`No task found with ID ${id}`);
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} updated successfully`);
}

function deleteTask(id) {
    let tasks = loadTasks();
    const task = findTask(tasks, id);
    if (!task) return console.log(`No task found with ID ${id}`);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    console.log(`Task ${id} deleted successfully`);
}

function markInProgress(id) {
    const tasks = loadTasks();
    const task = findTask(tasks, id);
    if (!task) return console.log(`No task found with ID ${id}`);
    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} marked as in-progress`);
}

function markDone(id) {
    const tasks = loadTasks();
    const task = findTask(tasks, id);
    if (!task) return console.log(`No task found with ID ${id}`);
    task.status = "done";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} marked as done`);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "add":
        addTask(args.slice(1).join(" "));
        break;
    case "list":
        listTasks(args[1]);
        break;
    case "update":
        updateTask(Number(args[1]), args.slice(2).join(" "));
        break;
    case "delete":
        deleteTask(Number(args[1]));
        break;
    case "mark-in-progress":
        markInProgress(Number(args[1]));
        break;
    case "mark-done":
        markDone(Number(args[1]));
        break;
    default:
        console.log("Unknown command");
        console.log("Commands: add, list, update, delete, mark-in-progress, mark-done");
}
