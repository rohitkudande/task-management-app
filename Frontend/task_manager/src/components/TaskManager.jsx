import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const API_URL = 'http://localhost:5000/api';

  // Set axios default header
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      if (editingTask) {
        const response = await axios.put(`${API_URL}/tasks/${editingTask.id}`, formData);
        toast.success('Task updated successfully');
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? response.data.task : task
        ));
        setEditingTask(null);
      } else {
        const response = await axios.post(`${API_URL}/tasks`, formData);
        toast.success('Task created successfully');
        setTasks([response.data.task, ...tasks]);
      }

      setFormData({
        title: '',
        description: '',
        status: 'pending'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const canModify = (task) => {
    return user?.role === 'admin' || task.user_id === user?.id;
  };

  return (
    <div>
      <div className="task-form">
        <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
            {editingTask && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingTask(null);
                  setFormData({ title: '', description: '', status: 'pending' });
                }}
                style={{ background: '#95a5a6' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="task-list">
        <h3>Tasks</h3>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No tasks found. Create your first task!
          </p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {task.description || 'No description'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small style={{ color: '#999' }}>
                  Created by: {task.username} | {new Date(task.created_at).toLocaleDateString()}
                </small>
                {canModify(task) && (
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;