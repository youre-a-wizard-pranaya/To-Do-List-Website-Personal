import React from 'react';
import TaskItem from './TaskItem';
import { TodoItem } from '@shared/schema';

interface TaskListProps {
  tasks: TodoItem[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (task: TodoItem) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {tasks.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </ul>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-2">No tasks yet!</p>
          <p className="text-sm text-gray-400">Add a task using the form above.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
