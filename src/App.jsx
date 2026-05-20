import React, { useState, useEffect } from 'react';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import AddTaskPage from './Pages/AddTaskPage';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (fullName, email, password) => {
    setIsLoggedIn(true);
    setCurrentUser({ fullName, email });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData
    };
    setTasks([...tasks, newTask]);
    setCurrentPage('home');
  };

  const handleEditTask = (id, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ));
  };

  const handleDeleteTask = (id) => {
    const updated = tasks
      .filter(task => task.id !== id)
      .map((task, index) => ({
        ...task,
        id: index + 1
      }));
    setTasks(updated);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {currentPage === 'home' ? (
        <Dashboard 
          user={currentUser}
          tasks={tasks}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      ) : (
        <AddTaskPage 
          user={currentUser}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onAddTask={handleAddTask}
          nextTaskId={tasks.length + 1}
        />
      )}
    </div>
  );
}
