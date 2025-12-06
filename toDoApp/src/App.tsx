import * as React from "react";
import "./global.css";

type todoItem = {
  id: number;
  val: string;
  compelete: boolean; 
};

function App(): React.ReactElement {
  const [text, setText] = React.useState("");
  const [todo, setTodo] = React.useState<todoItem[]>([]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: todoItem = {
      id: Date.now(),
      val: trimmed,
      compelete: false,
    };
    setTodo((prev) => [newTodo, ...prev]);
    setText("");
  }

  function handleDelete(id: number) {
    setTodo((prev) => prev.filter((val) => val.id !== id));
  }

  function handleDone(id: number) {
    setTodo((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, compelete: true } : val
      )
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-fuchsia-600 flex items-center justify-center p-4 font-sans">
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 flex flex-col max-h-[85vh]">
        
        <div className="p-8 pb-4">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-600 tracking-tight">
            Focus.
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            What's your main goal today?
          </p>
        </div>

        <div className="px-8 mb-4">
          <form onSubmit={handleAdd} className="relative group">
            <input
              type="text"
              placeholder="Type a task..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 placeholder:text-slate-400 font-medium py-4 pl-5 pr-14 rounded-2xl border-2 border-transparent focus:border-orange-400 focus:bg-white focus:ring-0 transition-all outline-none"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-gradient-to-r from-orange-500 to-fuchsia-600 rounded-xl text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {todo.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-slate-400/80 dashed-border rounded-2xl border-2 border-dashed border-slate-200 mt-2">
              <p className="font-semibold">No tasks yet</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todo.map((item) => (
                <li
                  key={item.id}
                  className={`group flex items-center gap-3 p-3 pr-4 rounded-2xl transition-all duration-300 ${
                    item.compelete
                      ? "bg-slate-50 opacity-60"
                      : "bg-white shadow-md shadow-slate-200 hover:shadow-lg hover:-translate-y-0.5 border border-slate-100"
                  }`}
                >
                  <button
                    onClick={() => handleDone(item.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                       item.compelete 
                       ? "bg-slate-200 text-slate-500" 
                       : "bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      {item.compelete ? <path d="M5 12l5 5l10 -10" /> : <circle cx="12" cy="12" r="10" strokeWidth="2"/>}
                    </svg>
                  </button>

                  <span
                    className={`flex-1 font-bold text-lg break-words ${
                      item.compelete
                        ? "text-slate-400 line-through decoration-2 decoration-slate-300"
                        : "text-slate-700"
                    }`}
                  >
                    {item.val}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:bg-rose-100 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;