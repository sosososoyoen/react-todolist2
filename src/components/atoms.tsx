import { atom, DefaultValue, selector } from "recoil"


const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IToDo) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

//카테고리의 타입 
export interface Categories {
  name: string;
}

export interface IToDo {
  text: string;
  id: number;
  //카테고리는 Categories enum 중 하나임;
  category: string;
}

export const categoryState = atom({
    key:"category",
    default:"TO_DO",
})

export const categoryList = atom<Categories[]>({
  key:"categories",
  default:[{ name: "TO_DO" }, { name: "DOING" }, { name: "DONE" }],
  effects_UNSTABLE: [localStorageEffect("categories")],
})

export const toDoState = atom<IToDo[]>({
  key: "toDo",
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