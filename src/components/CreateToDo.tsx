import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoSelector, toDoState } from "./atoms";
interface IForm {
  toDo: string;
}
function CreateToDo() {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category},
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem("toDos",JSON.stringify(toDos));
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo")} placeholder="할일적어" />
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
