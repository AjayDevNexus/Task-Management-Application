import PropTypes from 'prop-types';

function TaskFilter({ filter, setFilter }) {
  return (
    <div className="filter-container">
      <h3 className="filter-title">Filter Tasks</h3>
      <div className="filter-buttons">
        {['All', 'Active', 'Completed'].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={filter === option ? 'filter-button active' : 'filter-button'}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

TaskFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TaskFilter;