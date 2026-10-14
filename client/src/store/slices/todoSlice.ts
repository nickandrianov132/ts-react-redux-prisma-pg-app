import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Добавим типы для фильтров
type FilterType = 'all' | 'completed' | 'active';

// 1. Описываем тип элемента
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 2. Описываем тип всего состояния слайса
interface TodoState {
  list: Todo[];
  filter: FilterType; // Новое поле для хранения текущего фильтра
}

const initialState: TodoState = {
  list: [],
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    // УДАЛЕНИЕ: фильтруем массив, оставляя все, кроме нужного id
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
    // ФИЛЬТРАЦИЯ: просто меняем значение строки фильтра
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});


export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;