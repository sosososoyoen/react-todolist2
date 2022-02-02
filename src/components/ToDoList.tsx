import React from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//     const [todo, setTodo] = useState("");
//     const [error, setError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {currentTarget : {value}} = event;
//         setTodo(value);
//         setError("");
//     }
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
//         event.preventDefault();
//         if (todo.length < 10) {
//             return setError("너무짧음")
//         }
//     }
//     return <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange}value={todo} placeholder="Write a to do" />
//             <button>Add</button>
//             {error !== "" ? error : null}
//         </form>
//     </div>
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    // setError("extraError", {message: "서버맛감"})
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: {
              value: true,
              message: "이메일 안썼음",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: true })}
          placeholder="성"
          />
        <input
          {...register("lastName", { required: true, 
            validate: {
                noNico: (value) => !value.includes("nico") || "니코ㄴㄴ",
                noNick: (value) => !value.includes("nick") || "닉ㄴㄴ"
            }
        })}
            placeholder="이름"
            />
            <span>{errors?.lastName?.message}</span>
        <input
          {...register("userName", { required: true })}
          placeholder="아이디"
        />
        <input
          {...register("password", { required: true })}
          placeholder="비번"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", { required: true })}
          placeholder="비번1"
        />
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
