import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";

import { RiDeleteBinFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";

//call useeffect when loading application

//useRef is used to access input node on DOM,,
//when loading app first call function useeffect
function Todo() {
  const [todo, setTodo] = useState(""); //to access data
  const [todos, setTodos] = useState([]); //to store data
  const [editId, setEditId] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]); //spreading all todos that are already there,todo is new todo that we wnt to save
      console.log(todos);

      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateCode = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: onComplete.id, list: to.list })
      );
      setTodos(updateCode);
      setEditId(0);
      setTodo("");
    }
  };

  const inputRef = useRef("null"); //initila value null

  useEffect(() => {
    // console.log(inputRef.current)
    inputRef.current.focus();
  }); // we can add dependency as well [],it will show only initial loading then

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status }; //initial stage here status will change to true from false
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id); //find data from todos
    setTodo(editTodo.list);
    setEditId(editTodo.id);
    console.log(editTodo);
  };
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input 
          className="input-field"
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="button" onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div
                className={`list-items-list" ${to.status ? "list-item" : ""}`}
              >
                {to.list}
              </div>
              <span>
              <AiFillEdit
                  className="list-items-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                
                <MdOutlineDownloadDone
                  className="list-items-icons"
                  id="complete"
                  title="complete"
                  onClick={() => onComplete(to.id)}
                />
               
                <RiDeleteBinFill 
                  className="list-items-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
