import React, { useState } from 'react';
import './taskCard.css';

export default function TaskCard({ task, onSave, onDelete, showNotification }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    status: task.status,
    assignedTo: task.assignedTo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const titleVal = formData.title.trim();
    const assignedVal = formData.assignedTo.trim();

    if (!titleVal && !assignedVal) {
      showNotification("Please enter task name and username!");
      return;
    }
    if (!titleVal) {
      showNotification("Please enter task description!");
      return;
    }
    if (!assignedVal) {
      showNotification("Please enter username!");
      return;
    }

    onSave(task.id, {
      title: titleVal,
      status: formData.status,
      assignedTo: assignedVal
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <div className="task-number">#{task.id} (Editing)</div>
        <div className="edit-field-group">
          <label>TASK NAME</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="edit-input-field"
          />
        </div>
        <div className="edit-field-row">
          <div className="edit-field-group">
            <label>STATUS</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="edit-input-field"
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>
          <div className="edit-field-group">
            <label>ASSIGN TO</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="edit-input-field"
            />
          </div>
        </div>
        <div className="task-actions editing-actions">
          <button className="save-btn-inline" onClick={handleSave}>
            ✓ Save
          </button>
          <button className="cancel-btn-inline" onClick={handleCancel}>
            ✕ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-number">#{task.id}</div>
      <h3 className="task-title">{task.title}</h3>
      <div className="task-meta">
        <span className="status-badge">{task.status}</span>
        <span className="assignee">{task.assignedTo}</span>
      </div>
      <div className="task-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
