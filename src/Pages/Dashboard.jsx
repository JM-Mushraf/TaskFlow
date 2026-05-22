import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import './dashboard.css';

export default function Dashboard({ user, tasks, onLogout, onNavigate, onEditTask, onDeleteTask, showNotification, isLoading }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filterStatus === 'All' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    onHold: tasks.filter(t => t.status === 'On Hold').length,
  };


  return (
    <div className="dashboard-container">
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
            className="nav-button home-btn active"
            onClick={() => onNavigate('home')}
          >
            🏠 Home
          </button>
          <button 
            className="nav-button add-task-btn"
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

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>
            Welcome, <span className="user-highlight">{user.fullName}</span> 👋
          </h1>
          <p>to Task Manager</p>
        </div>

        <div className="stats-section">
          <div className="stat-card total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">TOTAL TASKS</div>
          </div>
          <div className="stat-card in-progress">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">IN PROGRESS</div>
          </div>
          <div className="stat-card completed">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">COMPLETED</div>
          </div>
          <div className="stat-card on-hold">
            <div className="stat-number">{stats.onHold}</div>
            <div className="stat-label">ON HOLD</div>
          </div>
        </div>

        <div className="search-filter-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tasks or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            {[
              { label: 'All', value: 'All' },
              { label: 'In Progress', value: 'In Progress' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Hold', value: 'On Hold' }
            ].map(tab => (
              <button
                key={tab.value}
                className={`filter-btn ${filterStatus === tab.value ? 'active' : ''}`}
                onClick={() => setFilterStatus(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="showing-info">Showing {filteredTasks.length} of {tasks.length} tasks</p>

        <div className="tasks-grid">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching tasks from API...</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onSave={onEditTask}
                onDelete={() => onDeleteTask(task.id)}
                showNotification={showNotification}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
