import { useForm } from "react-hook-form";

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

  async function onSubmit(values: AddTodoFormData) {
    console.log(values);
    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-8 max-md:gap-3 md:py-10 max-md:w-full max-md:max-w-[18rem] mx-auto p-3"
    >
      <div className="text-center w-full">
        <h1 className="text-lg font-medium">Add todo here...</h1>
        <p className="italic text-sm text-secondary line-clamp-1 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
      <div className="w-full space-y-1">
        <input
          className="w-full h-10 max-md:h-8 rounded-md text-primary px-5"
          {...register("todo", {
            required: "Required",
          })}
        />
        {errors?.todo && (
          <p className="text-red-400 italic">{errors.todo.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary w-full rounded-md h-10 max-md:h-8 text-lg"
      >
        Add
      </button>
    </form>
  );
}
