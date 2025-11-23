import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./App.css";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  // Estado inicial seguro: só acessa localStorage se estiver no cliente
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
      } catch (err) {
        console.error("Erro ao parsear localStorage:", err);
        return [];
      }
    }
    return [];
  });

  // Sempre que tasks mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Erro ao salvar no localStorage:", err);
    }
  }, [tasks]);

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function onTaskClick(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function onDeleteTaskClick(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
