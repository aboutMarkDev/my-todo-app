import { useEditTodo, useGetTodosByUser } from "@/lib/react-query/queries";
import TodoListSkeleton from "./TodoListSkeleton";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/User";
import EmptyTodo from "./EmptyTodo";
import toast from "react-hot-toast";

// DONE WITH EDITING TODO, NEXT UPDATING THE ISDONE AND ITS UI WHICH IS LINE-THROUGH AND THE DELETE TODO. JUST CREATE A NEW ROUTES FOR THESE TWO.

interface ITodos {
  _id: string;
  userId: string;
  todo: string;
  isDone: boolean;
}

export default function TodoList() {
  const { user } = useUserContext();

  const { data: todosByUser, isPending: isTodosLoading } = useGetTodosByUser(
    user.id
  );

  const { mutateAsync: editTodo, isPending: isEditingLoading } = useEditTodo(
    user.id
  );

  const [isEditing, setIsEditing] = useState(""); //STATE FOR INDICATING WHICH TODOLIST IS EDITING OR IN A INPUT ELEMENT FORM

  const [updatedTodo, setUpdatedTodo] = useState("");

  const [inputErr, setInputErr] = useState(false); //STATE FOR INPUT ERROR

  useEffect(() => {
    if (updatedTodo.length <= 2) {
      setInputErr(true);
    } else {
      setInputErr(false);
    }
  }, [updatedTodo]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    beforeTodo: string,
    todoId: string
  ) => {
    e.preventDefault();

    try {
      // First validation: If input error is true, user can't call api. And if he wanted to just go back click again.
      if (inputErr) {
        return setIsEditing("");
      }

      // Second validation: If input value doesn't change just set the isediting state to empty string or reset the state.
      //   if beforeTodo is equal to updatedTodo it means that the user didn't change the value of input
      if (beforeTodo === updatedTodo) {
        return setIsEditing("");
      }

      const myUpdatedTodo = await editTodo({
        updatedTodo,
        todoId,
      });

      toast.success(myUpdatedTodo);

      setIsEditing("");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return isTodosLoading ? (
    <TodoListSkeleton />
  ) : todosByUser.length > 0 ? (
    <ul className="p-3 space-y-3 overflow-hidden">
      {todosByUser?.map((list: ITodos) => {
        const currentlyEditing = isEditing === list._id;
        return (
          <li key={list._id}>
            {currentlyEditing ? (
              <form
                className="flex items-center justify-between h-8"
                onSubmit={(e) => handleSubmit(e, list.todo, list._id)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={updatedTodo}
                    className="rounded-md h-8 px-5 text-primary"
                    onChange={(e) => setUpdatedTodo(e.target.value)}
                  />
                  {inputErr && (
                    <p className="text-red-400 text-sm italic">
                      Required more than 2 char.
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isEditingLoading}
                    className="rounded-md bg-green-400 px-5 py-1 text-black-100"
                  >
                    {isEditingLoading
                      ? "Loading..."
                      : inputErr
                      ? "Back"
                      : "Save"}
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-400 px-5 py-1 text-black-100"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between h-8">
                <p className="px-1 line-clamp-2">{list.todo}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(list._id);
                      setUpdatedTodo(list.todo);
                    }}
                    className="rounded-md bg-blue-400 px-5 py-1 text-black-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-400 px-5 py-1 text-black-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <EmptyTodo />
  );
}
