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
  const [notification, setNotification] = useState(null);
  const [notificationTimer, setNotificationTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message, type = 'error') => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);
    setNotificationTimer(timer);
  };

  useEffect(() => {
    const fetched = localStorage.getItem('tasks_fetched');
    if (!fetched) {
      setIsLoading(true);
      const fetchTasksAndUsers = async () => {
        try {
          const [todosRes, usersRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos'),
            fetch('https://jsonplaceholder.typicode.com/users')
          ]);
          const todos = await todosRes.json();
          const users = await usersRes.json();

          const userMap = {};
          users.forEach(u => {
            userMap[u.id] = u.name;
          });

          const mapped = todos.map((todo, index) => ({
            id: index + 1,
            title: todo.title,
            status: todo.completed ? 'Completed' : 'In Progress',
            assignedTo: userMap[todo.userId] || 'Unassigned'
          }));

          setTasks(mapped);
          localStorage.setItem('tasks_fetched', 'true');
        } catch (error) {
          console.error("Error fetching tasks/users:", error);
          showNotification("Failed to fetch initial tasks from API.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchTasksAndUsers();
    }
  }, []);

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
      id: 1,
      ...taskData
    };
    const updated = [newTask, ...tasks].map((task, index) => ({
      ...task,
      id: index + 1
    }));
    setTasks(updated);
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
      {notification && (
        <div className={`custom-notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? '✅' : '⚠️'}
          </span>
          <span className="notification-message">{notification.message}</span>
          <button className="notification-close" onClick={() => setNotification(null)}>✕</button>
        </div>
      )}
      {currentPage === 'home' ? (
        <Dashboard 
          user={currentUser}
          tasks={tasks}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          showNotification={showNotification}
          isLoading={isLoading}
        />
      ) : (
        <AddTaskPage 
          user={currentUser}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onAddTask={handleAddTask}
          nextTaskId={1}
          showNotification={showNotification}
        />
      )}
    </div>
  );
}
