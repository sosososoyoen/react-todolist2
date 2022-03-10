import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryList, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  let toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryList);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  //카테고리 옵션 input 이벤트
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const savedToDos = JSON.parse(localStorage.getItem("toDos") || "{}");
  useEffect(() => {
    setToDos(() => {
      return [...savedToDos];
    });
  }, []);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((c, index) => {
          return (
            <option key={index} value={c.name}>
              {c.name}
            </option>
          );
        })}
      </select>
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
