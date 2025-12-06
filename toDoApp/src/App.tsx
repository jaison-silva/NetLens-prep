import * as React from "react";

type todoItem = {
  id: number,
  val: string,
  compelete : boolean
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
      compelete : false
    };

    setTodo((prev) => [newTodo, ...prev]);
    setText("");
  }

  function handleDelete(id : number){
  setTodo((prev)=>{
      return prev.filter((val)=>{
        return val.id !== id 
      })
    })
  }

  function handleDone(id: number){
    setTodo((prev)=>{
      return prev.map((val)=>{
        return val.id == id ? {...val, compelete: true} : val
      })
    })
  }

  return (
    <div>
      <div>
        <h2>To Do App</h2>
        <form onSubmit={handleAdd}>
          <label>Enter the task</label>
          <input
            type="text"
            placeholder="what's on your mind"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button type="submit">Add</button>
        </form>

        {/* the list */}

        {todo.length === 0 ? <p>No list to display yet</p> : null}

        <ul>
          {todo.map((list: todoItem) => {
            return (
              <>
                <li key={list.id}>{list.val}</li>
                <button onClick={()=>handleDone(list.id)}>Done</button>
                <button onClick={()=>handleDelete(list.id)}>delete</button>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
