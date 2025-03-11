import React, { useState } from 'react';
import { TodoItem } from '@shared/schema';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: TodoItem;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (task: TodoItem) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask, editTask }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleDelete = () => {
    setFadeOut(true);
    // Delete after animation completes
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };
  
  return (
    <li 
      className={`p-4 flex items-center gap-3 hover:bg-gray-50 transition-all duration-300 
        ${task.completed ? 'line-through text-gray-500' : ''} 
        ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Custom checkbox */}
      <div 
        className={`relative inline-block w-[18px] h-[18px] border-2 border-[#4a6fa5] rounded cursor-pointer transition-colors
          ${task.completed ? 'bg-[#28a745] border-[#28a745]' : ''}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.completed && (
          <span className="absolute text-white text-xs top-[-3px] left-[2px]">✓</span>
        )}
      </div>
      
      {/* Task text */}
      <span className="flex-grow">{task.text}</span>
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <button 
          className="text-[#4a6fa5] hover:text-opacity-80" 
          onClick={() => editTask(task)}
        >
          <Pencil size={16} />
        </button>
        <button 
          className="text-[#ff6b6b] hover:text-opacity-80" 
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
