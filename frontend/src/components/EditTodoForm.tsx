import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEditTodo } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/User";
import { EditTodoFormProps } from "@/types";
import { Input } from "./ui/input";
import InputWarningMessage from "./InputWarningMessage";

export default function EditTodoForm({
  list,
  handleDelete,
  setTodoToDelete,
  currentlyToDelete,
  isDeletingLoading,
  setTodoToEdit,
  updatedTodo,
  setUpdatedTodo,
}: EditTodoFormProps) {
  const { user } = useUserContext();

  const { mutateAsync: editTodo, isPending: isEditingLoading } = useEditTodo(
    user.id
  );

  const [inputErr, setInputErr] = useState(false);

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
        return setTodoToEdit("");
      }

      // Second validation: If input value doesn't change just set the isediting state to empty string or reset the state.
      //   if beforeTodo is equal to updatedTodo it means that the user didn't change the value of input
      if (beforeTodo === updatedTodo) {
        return setTodoToEdit("");
      }

      const myUpdatedTodo = await editTodo({
        updatedTodo,
        todoId,
      });

      toast.success(myUpdatedTodo);

      setTodoToEdit("");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <form
      className="flex items-center justify-between h-8"
      onSubmit={(e) => handleSubmit(e, list.todo, list._id)}
    >
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={updatedTodo}
          className="px-5"
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />
        {inputErr && <InputWarningMessage errorMessage="Required" />}
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isEditingLoading}
          className="bg-green-400 hover:bg-green-500 text-black-100 transition-colors duration-200"
        >
          {isEditingLoading ? (
            <>
              <Loader2 className="animate-spin" /> Loading...
            </>
          ) : inputErr ? (
            "Back"
          ) : (
            "Save"
          )}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setTodoToDelete(list._id);
            handleDelete(list._id);
          }}
          disabled={currentlyToDelete && isDeletingLoading}
          className="bg-red-400 hover:bg-red-500 text-black-100 transition-colors duration-200"
        >
          {currentlyToDelete && isDeletingLoading ? (
            <>
              <Loader2 className="animate-spin" /> Loading...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </form>
  );
}
