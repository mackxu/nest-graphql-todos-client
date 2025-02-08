import { gql, useMutation, useQuery } from "@apollo/client";

type Todo = {
  id: number;
  content: string;
};

type TodoList = {
  todos: Todo[];
};

const getTodoList = gql`
  query getTodoList {
    todos {
      id
      content
    }
  }
`;

const createTodo = gql`
  mutation CreateTodo($todo: CreateTodoItemInput!) {
    createTodo(createTodoItem: $todo) {
      id
      content
    }
  }
`;

const updateTodoItem = gql`
  mutation UpdateTodo($todo: UpdateTodoItemInput!) {
    updateTodo(updateTodoItem: $todo) {
      id
      content
    }
  }
`;

// 注意：deleteTodo返回的是Int类型
const removeTodoItem = gql`
  mutation RemoveTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

function App() {
  const [addTodo] = useMutation(createTodo);
  // console.log(res, 'addTodo');
  const [updateTodo, res] = useMutation(updateTodoItem);
  console.log(res, "updateTodo");
  const addTodoHandler = async () => {
    await addTodo({
      variables: {
        todo: {
          content: "zhangsanfeng",
        },
      },
    });
  };

  const updateTodoHandler = () => {
    updateTodo({
      variables: {
        todo: {
          id: 2,
          content: "lisi xxxx",
        },
      },
    });
  };

  const [removeTodo] = useMutation(removeTodoItem);

  const removeTodoHandler = () => {
    removeTodo({
      variables: {
        id: 2,
      },
    });
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={addTodoHandler}>
        Add Todo
      </button>
      <button type="button" onClick={updateTodoHandler}>
        update Todo
      </button>
      <button type="button" onClick={removeTodoHandler}>
        remove Todo
      </button>
      <List />
    </div>
  );
}

function List() {
  const { data, error, loading } = useQuery<TodoList>(getTodoList);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <ul>
      {data?.todos.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </ul>
  );
}

export default App;
