import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { DataListProps } from "@/types";
import { useToggleDone } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/User";
import toast from "react-hot-toast";

export default function DataList({
  list,
  setTodoToToggle,
  currentlyToToggle,
  setTodoToEdit,
  setUpdatedTodo,
  setTodoToDelete,
  handleDelete,
  currentlyToDelete,
  isDeletingLoading,
}: DataListProps) {
  const { user } = useUserContext();

  const { mutateAsync: toggleDone, isPending: isToggling } = useToggleDone(
    user.id
  );

  const handleToggleDone = async (isDone: boolean, todoId: string) => {
    try {
      await toggleDone({ isDone, todoId });
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="flex items-center justify-between h-8">
      {/* Todo text */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => {
          setTodoToToggle(list._id);
          handleToggleDone(list.isDone, list._id);
        }}
      >
        <div>
          {list.isDone ? (
            <CircleCheck className="text-green-300" />
          ) : (
            <Circle />
          )}
        </div>
        <p
          className={`${
            list.isDone && "text-green-300/50 line-through"
          } px-1 line-clamp-2`}
        >
          {currentlyToToggle && isToggling ? (
            <Loader2 className="animate-spin" />
          ) : (
            list.todo
          )}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => {
            setTodoToEdit(list._id);
            setUpdatedTodo(list.todo);
          }}
          disabled={list.isDone}
          className="bg-blue-400 hover:bg-blue-500 text-black-100 transition-colors duration-200"
        >
          Edit
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
    </div>
  );
}
