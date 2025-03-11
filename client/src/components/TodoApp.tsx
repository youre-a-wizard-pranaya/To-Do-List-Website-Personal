import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import FilterTabs from './FilterTabs';
import TaskList from './TaskList';
import TaskCounter from './TaskCounter';
import EditModal from './EditModal';
import { TodoItem } from '@shared/schema';

const TodoApp = () => {
  // States
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingTask, setEditingTask] = useState<TodoItem | null>(null);
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
        setTasks([]);
      }
    } else {
      // Initial sample tasks for first-time users
      const initialTasks: TodoItem[] = [
        { id: 1, text: 'Complete the JavaScript project', completed: false },
        { id: 2, text: 'Study HTML basics', completed: true },
        { id: 3, text: 'Read about CSS properties', completed: false }
      ];
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (text: string) => {
    if (!text.trim()) return; // Prevent empty tasks
    
    const newTask: TodoItem = {
      id: Date.now(), // Simple way to generate unique IDs
      text: text,
      completed: false
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Toggle task completion status
  const toggleComplete = (id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Show edit modal
  const editTask = (task: TodoItem) => {
    setEditingTask(task);
  };

  // Update task after editing
  const updateTask = (id: number, newText: string) => {
    if (!newText.trim()) return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      )
    );
    
    setEditingTask(null); // Close the modal
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Count remaining (uncompleted) tasks
  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="bg-[#e8f0fe] min-h-screen font-['Poppins'] text-[#343a40]">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#4a6fa5] mb-2">My Todo List</h1>
          <p className="text-sm text-gray-600">Keep track of your daily tasks</p>
        </header>

        {/* Task Form */}
        <TaskForm addTask={addTask} />

        {/* Filter Tabs */}
        <FilterTabs currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks} 
          toggleComplete={toggleComplete} 
          deleteTask={deleteTask} 
          editTask={editTask} 
        />

        {/* Task Counter */}
        <TaskCounter remainingTasks={remainingTasks} />

        {/* Edit Modal */}
        {editingTask && (
          <EditModal 
            task={editingTask} 
            updateTask={updateTask} 
            cancelEdit={cancelEdit} 
          />
        )}
      </div>
    </div>
  );
};

export default TodoApp;
