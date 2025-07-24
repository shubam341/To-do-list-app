import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export type FilterType = 'all' | 'pending' | 'completed';
export type SortType = 'date' | 'priority' | 'alphabetical';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
  darkMode: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string; dueDate?: Date; priority: 'low' | 'medium' | 'high' } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: SortType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'REORDER_TODOS'; payload: Todo[] }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sortBy: 'date',
  searchQuery: '',
  darkMode: false,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: Date.now().toString(),
            createdAt: new Date(),
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, dueDate: action.payload.dueDate, priority: action.payload.priority }
            : todo
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'REORDER_TODOS':
      return { ...state, todos: action.payload };
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}

interface TodoContextType {
  state: TodoState;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high') => void;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
  setSearch: (query: string) => void;
  toggleDarkMode: () => void;
  reorderTodos: (todos: Todo[]) => void;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTodos) {
      try {
        const todos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        dispatch({ type: 'LOAD_TODOS', payload: todos });
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }

    if (savedDarkMode === 'true') {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', state.darkMode.toString());
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const editTodo = (id: string, text: string, dueDate?: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text, dueDate, priority } });
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: SortType) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const reorderTodos = (todos: Todo[]) => {
    dispatch({ type: 'REORDER_TODOS', payload: todos });
  };

  // Filter and sort todos
  const filteredTodos = React.useMemo(() => {
    let filtered = state.todos;

    // Apply filter
    switch (state.filter) {
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'pending':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    // Apply search
    if (state.searchQuery) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply sort
    switch (state.sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'date':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [state.todos, state.filter, state.searchQuery, state.sortBy]);

  return (
    <TodoContext.Provider value={{
      state,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      setFilter,
      setSort,
      setSearch,
      toggleDarkMode,
      reorderTodos,
      filteredTodos,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}