import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todo_items from "./Todo_items";

export default function Todo() {
  // const [todoList, setTodoList] = useState(
  //   localStorage.getItem("todos")
  //     ? JSON.parse(localStorage.getItem("todos"))
  //     : []
  // );

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=0")
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  }, []);

  const inputRef = useRef();

  // const add = () => {
  //   const inputText = inputRef.current.value.trim();

  //   if (inputText === "") {
  //     return null;
  //   }
  //   const newTodo = {
  //     id: Date.now(),
  //     text: inputText,
  //     isComplete: false,
  //   };
  //   setTodoList((prev) => [...prev, newTodo]);
  //   inputRef.current.value = "";
  // };

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      title: inputText,
      completed: false,
    };

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // اضافه کردن به لیست
        setTodoList((prev) => [
          ...prev,
          { ...data, text: data.title, id: Date.now(), isComplete: false },
        ]);
      });

    inputRef.current.value = "";
  };

  // const deleteTodo = (id) => {
  //   setTodoList((prvTodos) => {
  //     return prvTodos.filter((todo) => todo.id !== id);
  //   });
  // };
  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  };

  // const toggle = (id) => {
  //   setTodoList((prevTodos) => {
  //     return prevTodos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, isComplete: !todo.isComplete };
  //       }
  //       return todo;
  //     });
  //   });
  // };

  // const editTodo = (id, newText) => {
  //   setTodoList((prevTodos) => {
  //     return prevTodos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, text: newText };
  //       }
  //       return todo;
  //     });
  //   });
  // };
  const toggle = (id) => {
    const todo = todoList.find((todo) => todo.id === id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: data.completed,
                  isComplete: data.completed,
                }
              : todo
          )
        );
      });
  };

  const editTodo = (id, newText) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: newText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: data.title } : todo
          )
        );
      });
  };

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todoList));
  // }, [todoList]);

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md
       flex flex-col p-7 min-h-[550px] rounded-xl"
    >
      {/*---------title--------------*/}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">to-Do List</h1>
      </div>
      {/*---------inpute box--------------*/}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 "
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/*---------todo list--------------*/}
      <div>
        {todoList.map((item, index) => {
          return (
            // <Todo_items
            //   key={index}
            //   text={item.text}
            //   id={item.id}
            //   isComplete={item.isComplete}
            //   deleteTodo={deleteTodo}
            //   toggle={toggle}
            //   editTodo={editTodo}
            // />
            <Todo_items
              key={item.id}
              text={item.title || item.text}
              id={item.id}
              isComplete={item.completed || item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={editTodo}
            />
          );
        })}
      </div>
    </div>
  );
}
