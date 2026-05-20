import React, { useState } from 'react';
import './addTaskPage.css';

export default function AddTaskPage({ user, onLogout, onNavigate, onAddTask, nextTaskId }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'In Progress',
    assignedTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.status) {
      onAddTask({
        title: formData.title,
        status: formData.status,
        assignedTo: formData.assignedTo || 'Unassigned'
      });
    }
  };

  return (
    <div className="add-task-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#7b84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
              <path d="M 12,3 L 20,7.5 L 20,16.5 L 12,21 L 4,16.5 L 4,7.5 Z" />
            </svg>
            TaskFlow
          </div>
        </div>
        <div className="navbar-center">
          <button 
            className="nav-button home-btn"
            onClick={() => onNavigate('home')}
          >
            🏠 Home
          </button>
          <button 
            className="nav-button add-task-btn active"
            onClick={() => onNavigate('addTask')}
          >
            + Add Task
          </button>
        </div>
        <div className="navbar-right">
          <span className="user-name">👤 {user.fullName}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="add-task-content">
        <div className="add-task-header">
          <h1>Add New Task</h1>
          <p>Fill in the details to create a new task</p>
        </div>

        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label>TASK NAME *</label>
            <textarea
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Describe the task..."
              className="input-field"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>STATUS *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option>In Progress</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>ASSIGN TO *</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Enter team member's name"
              className="input-field"
            />
          </div>

          <div className="task-id-info">
            Task ID will be <span className="task-id-value">#{nextTaskId}</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-task-btn primary">
              + Add Task
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => onNavigate('home')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
