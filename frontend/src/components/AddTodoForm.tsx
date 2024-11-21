import { useForm } from "react-hook-form";
import { useAddTodo } from "../lib/react-query/queries";
import { useUserContext } from "../context/User";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import InputWarningMessage from "./InputWarningMessage";

type AddTodoFormData = {
  todo: string;
};

export default function AddTodoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoFormData>({
    defaultValues: {
      todo: "",
    },
  });

  const { user } = useUserContext();

  const { mutateAsync: addTodo, isPending: isAddingTodo } = useAddTodo(user.id);

  async function onSubmit(values: AddTodoFormData) {
    try {
      const newTodo = await addTodo(values.todo);

      toast.success(newTodo);

      reset();
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-8 max-md:gap-2 md:py-10 md:px-5 max-md:w-full max-md:max-w-[18rem] mx-auto py-2"
    >
      <div className="text-center w-full">
        <h1 className="text-lg font-medium">Add todo here...</h1>
        <p className="italic text-sm text-secondary line-clamp-1 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
      <div className="w-full space-y-1">
        <Input
          className="px-5"
          {...register("todo", {
            required: "Required",
            minLength: {
              value: 3,
              message: "Todo must be at least 3 characters long.",
            },
          })}
        />
        {errors?.todo && (
          <InputWarningMessage errorMessage={errors.todo.message || ""} />
        )}
      </div>
      <Button
        type="submit"
        disabled={isAddingTodo}
        className="bg-primary hover:bg-primary/40 transition-colors duration-200 w-full"
      >
        {isAddingTodo ? (
          <>
            <Loader2 className="animate-spin" />
            Loading...
          </>
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
