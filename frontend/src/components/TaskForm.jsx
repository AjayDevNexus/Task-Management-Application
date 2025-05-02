import { useState } from 'react';
import { createTask } from '../api';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, priority }, token);
      setTitle('');
      setDescription('');
      setPriority('Low');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="task-form-container">
      <h3 className="task-form-title">Add New Task</h3>
      {error && <p className="error-text">{error}</p>}
      <div onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="submit-button"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

TaskForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.oneOf(['Low', 'Medium', 'High']),
};

export default TaskForm;