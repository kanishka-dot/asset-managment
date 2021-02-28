import React from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add_todo":
      return {
        todos: [...state.todos, { text: action.todo, status: false }],
      };
    default:
      return state;
  }
}

function Test() {
  const [{ todos }, dispatch] = React.useReducer(reducer, { todos: [] });
  const [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    console.log("Render");
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "add_todo", todo });
        setTodo("");
      }}
    >
      <input value={todo} onChange={(e) => setTodo(e.target.value)}></input>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </form>
  );
}

export default Test;
