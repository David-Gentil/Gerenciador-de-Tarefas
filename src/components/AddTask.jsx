import { SaveIcon } from "lucide-react";
import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        type="text"
        placeholder="Digite o Título da Tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <input
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        type="text"
        placeholder="Digite a Descrição da Tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></input>
      <button
        onClick={() => {
          //Verificar se existem dados nos campos para adição
          if (!title.trim() || !description.trim()) {
            return alert("preencha o título e descrição da tarefa");
          }

          // Adicionando tarefas
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 px-4 py-2 rounded-md font-medium text-white flex justify-between w-full"
      >
        <span>Adicionar Tarefa</span>
        <SaveIcon />
      </button>
    </div>
  );
}
export default AddTask;
