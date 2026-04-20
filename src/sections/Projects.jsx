import dayjs from "dayjs";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";

export const Projects = () => {
  const [inputTodoList, setinputTodoList] = useState("");
  const [todoList, setTodoList] = useState([]);

  function saveInputText(event) {
    setinputTodoList(event.target.value);

    {
      event.key === "Enter" && addTodoList();
    }
  }

  function addTodoList() {
    setTodoList((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        todo: inputTodoList,
        date: dayjs().format("MMMM D, YYYY"),
      },
    ]);

    setinputTodoList("");
  }

  function deleteTodo(id) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <section
      id="projects"
      className="h-screen flex flex-col items-center justify-center"
    >
      <div className="mb-5">BASIC TO DO LIST</div>
      <div className="flex justify-between items-cente w-1xl md:w-2xl lg:w-4xl mb-6 gap-10">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputTodoList}
          onChange={saveInputText}
          onKeyDown={saveInputText}
        />
        <button
          className="bg-blue-600 py-3 px-6 rounded-2xl flex items-center gap-2 hover:bg-blue-600/80"
          onClick={addTodoList}
        >
          ADD
          <span>
            <Plus />
          </span>
        </button>
      </div>
      <div className="border border-amber-50 bg-slate-800">
        <table className="table-fixed w-xs md:w-2xl lg:w-4xl border-collapse">
          <thead>
            <tr className="bg-black">
              <th className="w-1/2 px-4 py-5 text-left uppercase">Todo</th>
              <th className="w-1/6 px-4 py-5 text-left uppercase">Date</th>
              <th className="w-1/6 px-4 py-5 text-center uppercase">Edit</th>
              <th className="w-1/6 px-4 py-5 text-center uppercase">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 max-w-xs wrap-break-word">
                  {item.todo}
                </td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2 text-center">
                  <Edit className="inline-block cursor-pointer" />
                </td>
                <td className="px-4 py-2 text-center">
                  <Trash
                    className="inline-block cursor-pointer"
                    onClick={() => deleteTodo(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
