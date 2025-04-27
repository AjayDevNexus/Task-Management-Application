import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [filter, setFilter] = useState('All');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.reload();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="header">
          <h2 className="dashboard-title">Task Management</h2>
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <TaskForm />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList filter={filter} />
      </div>
    </div>
  );
}

export default Dashboard;