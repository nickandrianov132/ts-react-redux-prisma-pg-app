import { addTodo } from '../../store/slices/todoSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';

export const TodoAdd = () => {
  const todos = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(addTodo('Выучить Redux'))}>Добавить задачу</button>
      {todos.map(todo => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
};
