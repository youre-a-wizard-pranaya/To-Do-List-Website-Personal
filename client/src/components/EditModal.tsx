import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TodoItem } from '@shared/schema';

interface EditModalProps {
  task: TodoItem;
  updateTask: (id: number, newText: string) => void;
  cancelEdit: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, updateTask, cancelEdit }) => {
  const [editTaskText, setEditTaskText] = useState(task.text);
  
  // Focus the input field when the modal opens
  useEffect(() => {
    const inputElement = document.getElementById('edit-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task.id, editTaskText);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      cancelEdit();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <Input 
            id="edit-input"
            type="text" 
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={cancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 active:scale-[0.98]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#4a6fa5] text-white px-4 py-2 rounded-md hover:bg-opacity-90 active:scale-[0.98]"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
