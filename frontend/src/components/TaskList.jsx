import { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../api';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

function TaskList({ filter }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTasks();
  }, [token]);

  const handleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(
        task._id,
        { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' },
        token
      );
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return task.status === 'incomplete';
    if (filter === 'Completed') return task.status === 'complete';
    return true;
  });

  return (
    <div className="task-list-container">
      <h3 className="task-list-title">Tasks</h3>
      {error && <p className="error-text">{error}</p>}
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-details">
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <p className="task-priority">Priority: {task.priority}</p>
                <p className="task-created">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleComplete(task)}
                  className={task.status === 'complete' ? 'undo-button' : 'complete-button'}
                >
                  {task.status === 'complete' ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

TaskList.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
};

export default TaskList;