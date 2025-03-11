import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskFormProps {
  addTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.trim()) {
      // Show validation error
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    
    addTask(newTask);
    setNewTask('');
    setError(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={`flex-grow px-4 py-2 ${error ? 'border-[#ff6b6b]' : 'border-gray-300'}`}
        />
        <Button 
          type="submit" 
          className="bg-[#4a6fa5] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors active:scale-[0.98]"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
