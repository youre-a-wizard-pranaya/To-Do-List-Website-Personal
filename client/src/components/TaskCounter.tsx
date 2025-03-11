import React from 'react';

interface TaskCounterProps {
  remainingTasks: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ remainingTasks }) => {
  return (
    <div className="mt-4 text-right text-sm text-gray-600">
      <span>{remainingTasks}</span> task{remainingTasks !== 1 ? 's' : ''} remaining
    </div>
  );
};

export default TaskCounter;
