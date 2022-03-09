import { atom, selector } from "recoil"


export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING"="DOING",
    "DONE"="DONE"
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
    key:"category",
    default:Categories.TO_DO
})

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
export const doingState = atom<IToDo[]>({
  key: "doing",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  //selector가 어떤 것을 반환할것인지
  get: ({ get }) => {
    //get() 원하는 state를 가져올 수 있음 
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category)
    

  },
});
