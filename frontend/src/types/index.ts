export type UserData = {
  username: string;
  password: string;
};

export interface IDataTodo {
  _id: string;
  userId: string;
  todo: string;
  isDone: boolean;
}

export type DataListProps = {
  list: IDataTodo;
  setTodoToToggle: React.Dispatch<React.SetStateAction<string>>;
  currentlyToToggle: boolean;
  setTodoToEdit: React.Dispatch<React.SetStateAction<string>>;
  setUpdatedTodo: React.Dispatch<React.SetStateAction<string>>;
  setTodoToDelete: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (todoId: string) => Promise<void>;
  currentlyToDelete: boolean;
  isDeletingLoading: boolean;
};

export type EditTodoFormProps = {
  list: IDataTodo;
  handleDelete: (todoId: string) => Promise<void>;
  setTodoToDelete: React.Dispatch<React.SetStateAction<string>>;
  currentlyToDelete: boolean;
  isDeletingLoading: boolean;
  setTodoToEdit: React.Dispatch<React.SetStateAction<string>>;
  updatedTodo: string;
  setUpdatedTodo: React.Dispatch<React.SetStateAction<string>>;
};
