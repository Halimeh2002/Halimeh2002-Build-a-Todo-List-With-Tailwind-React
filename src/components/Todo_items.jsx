import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

export default function Todo_items({
  text,
  id,
  isComplete,
  deleteTodo,
  toggle,
  editTodo,
}) {
  const [isEditing, setIsEditing] = useState(false); // حالت ویرایش
  const [editText, setEditText] = useState(text); // متن جدید برای ویرایش

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(id, editText); // به‌روزرسانی متن وظیفه
      setIsEditing(false); // خروج از حالت ویرایش
    } else {
      alert("");
    }
  };

  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          if (!isEditing) toggle(id); // فقط اگه در حال ویرایش نیستیم، toggle کنیم
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img className="w-7" src={isComplete ? tick : not_tick} alt="وضعیت" />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === "Enter" && handleEdit()}
            className="ml-4 text-[17px] border rounded px-2 py-1 flex-1"
            autoFocus
            aria-label="ویرایش وظیفه"
          />
        ) : (
          <p
            className={`text-slate-700 ml-4 text-[17px] decoration-slice-500 ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <img
          onClick={() => setIsEditing(true)} // فعال کردن حالت ویرایش
          className="cursor-pointer max-w-[25px]"
          src={edit_icon}
          alt=""
        />
        <img
          onClick={() => deleteTodo(id)} // قبلاً اصلاح شده
          className="cursor-pointer max-w-[25px]"
          src={delete_icon}
          alt=""
        />
      </div>
    </div>
  );
}
