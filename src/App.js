import React, { useState } from "react";
import "./App.css"; // Custom CSS file
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, isEditing: false }]);
      setNewTask('');
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleEdit = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isEditing: !task.isEditing } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditChange = (e, index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, text: e.target.value } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      saveEdit(index);
    }
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isEditing: false } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };


  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">My TO-DO</div>
      </nav>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Welcome</h1>
            <center>
              Let's list your tasks and enjoy your day!
            </center>
            <br/>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={newTask}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task"
              />
              <button className="btn btn-add" onClick={addTask}>
                Add Task
              </button>
            </div>
            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index} className="task-item">
                  {task.isEditing ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={task.text}
                        onChange={(e) => handleEditChange(e, index)}
                        onKeyPress={(e) => handleEditKeyPress(e, index)}
                      />
                      <button
                        className="btn btn-save"
                        onClick={() => saveEdit(index)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{task.text}</span>
                      <div className="task-actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => toggleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

