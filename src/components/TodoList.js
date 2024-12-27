import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TodoList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // Save tasks to localStorage
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    // Handle adding a task
    const handleAddTask = () => {
        if (task.trim()) {
            const newTask = {
                id: Date.now(),
                text: task,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setTask('');
        }
    };

    // Handle task completion (toggle)
    const handleToggleTask = (id) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Handle deleting a task (also from local storage)
    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Enter key press to add a task
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="todo-app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="task-list-container">
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <div className="task-item">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                    title={task.completed ? 'Mark as not complete' : 'Mark as completed'}
                                />
                                <span
                                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                    className="task-text"
                                >
                                    {task.text}
                                </span>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    title="Delete Task"
                                    className="delete-btn"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
