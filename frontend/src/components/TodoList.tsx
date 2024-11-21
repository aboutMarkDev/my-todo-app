import { useDeleteTodo, useGetTodosByUser } from "@/lib/react-query/queries";
import TodoListSkeleton from "./TodoListSkeleton";
import { useState } from "react";
import { useUserContext } from "@/context/User";
import EmptyTodo from "./EmptyTodo";
import toast from "react-hot-toast";
import EditTodoForm from "./EditTodoForm";
import { IDataTodo } from "@/types";
import DataList from "./DataList";

export default function TodoList() {
  const { user } = useUserContext();

  const { data: todosByUser, isPending: isTodosLoading } = useGetTodosByUser(
    user.id
  );
  const { mutateAsync: deleteTodo, isPending: isDeletingLoading } =
    useDeleteTodo(user.id);

  // This will indicate which todo is on editing, deleting, and toggling.
  // This will store todoId of todo to perform some basic indication.
  // (e.g., If I click the edit button, it will set the Id of that todo to transform it into form for submitting the updated todo)
  const [todoToEdit, setTodoToEdit] = useState<string>("");
  const [todoToDelete, setTodoToDelete] = useState<string>("");
  const [todoToToggle, setTodoToToggle] = useState<string>("");

  const [updatedTodo, setUpdatedTodo] = useState<string>("");

  // For deleting todo
  const handleDelete = async (todoId: string) => {
    try {
      const todoToDelete = await deleteTodo(todoId);

      toast.success(todoToDelete);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return isTodosLoading ? (
    <TodoListSkeleton />
  ) : todosByUser.length > 0 ? (
    <ul className="p-3 space-y-3 overflow-hidden">
      {todosByUser?.map((list: IDataTodo) => {
        const currentlyEditing = todoToEdit === list._id;
        const currentlyToDelete = todoToDelete === list._id;
        const currentlyToToggle = todoToToggle === list._id;

        return (
          <li key={list._id}>
            {currentlyEditing ? (
              <EditTodoForm
                list={list}
                handleDelete={handleDelete}
                setTodoToDelete={setTodoToDelete}
                currentlyToDelete={currentlyToDelete}
                isDeletingLoading={isDeletingLoading}
                setTodoToEdit={setTodoToEdit}
                updatedTodo={updatedTodo}
                setUpdatedTodo={setUpdatedTodo}
              />
            ) : (
              <DataList
                list={list}
                setTodoToToggle={setTodoToToggle}
                currentlyToToggle={currentlyToToggle}
                setTodoToEdit={setTodoToEdit}
                setUpdatedTodo={setUpdatedTodo}
                setTodoToDelete={setTodoToDelete}
                handleDelete={handleDelete}
                currentlyToDelete={currentlyToDelete}
                isDeletingLoading={isDeletingLoading}
              />
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <EmptyTodo />
  );
}
