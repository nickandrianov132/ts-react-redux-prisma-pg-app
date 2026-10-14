import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { deleteTodo, setFilter, toggleTodo } from '../../store/slices/todoSlice';


export const TodoList = () => {
  const dispatch = useAppDispatch();
  
  // Получаем и список, и текущий фильтр
  const { list, filter } = useAppSelector((state) => state.todos);

  // Логика фильтрации перед отрисовкой
  const filteredTodos = list.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true; // для 'all'
  });

  return (
    <div>
      {/* Кнопки фильтрации */}
      <div>
        <button onClick={() => dispatch(setFilter('all'))}>Все</button>
        <button onClick={() => dispatch(setFilter('active'))}>Активные</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Выполненные</button>
      </div>

      {/* Список задач */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span 
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
