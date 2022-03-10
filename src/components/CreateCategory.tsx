import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryList, categoryState, toDoSelector, toDoState } from "./atoms";
interface IForm {
  category: string;
}
function CreateCategory() {
  const setCategory = useSetRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({category}: IForm) => {
    setCategory((categories) => [
        { name: category},
        ...categories,
      ]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("category")} placeholder="category" />
      <button>Add</button>
    </form>
  );
}
export default CreateCategory;
