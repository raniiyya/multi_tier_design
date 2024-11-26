import React, { useState } from "react";
import "./App.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const addTask = (title) => {
    if (title.trim()) {
      setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const hideCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <TaskInput onAdd={addTask} />
      <div className="controls">
        <button onClick={hideCompleted}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
        <button onClick={clearAll}>Clear All Tasks</button>
      </div>
      <div className="task-list">
        {tasks
          .filter((task) => showCompleted || !task.completed)
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
      </div>
    </div>
  );
};

const TaskInput = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    onAdd(input);
    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}s
        placeholder="Add a new task"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

const Task = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onToggleComplete(task.id)}>
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskManager;
