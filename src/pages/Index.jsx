import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalTrigger } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", dueDate: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", dueDate: null });
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
      </header>
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox />
              <div>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.dueDate ? format(task.dueDate, "PPP") : "No due date"}</CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => { setCurrentTask(task); setIsModalOpen(true); }}>Edit</Button>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Input
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <Calendar
          mode="single"
          selected={newTask.dueDate}
          onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
        />
        <Button onClick={addTask} className="mt-2">Add Task</Button>
      </div>
      {isModalOpen && currentTask && (
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Task</ModalTitle>
              <ModalDescription>
                <Input
                  placeholder="Task title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                />
                <Calendar
                  mode="single"
                  selected={currentTask.dueDate}
                  onSelect={(date) => setCurrentTask({ ...currentTask, dueDate: date })}
                />
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button onClick={() => updateTask(currentTask)}>Save</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Index;