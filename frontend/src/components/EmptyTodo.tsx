export default function EmptyTodo() {
  return (
    <section className="h-full flex-col flex-icenter text-gray-400">
      <img
        src="/assets/images/to-do-list.svg"
        alt="todo-list"
        width={80}
        height={80}
      />
      <h1 className="max-md:text-3xl text-4xl font-bold">No todos yet!</h1>
      <p className="max-md:text-sm italic font-light">
        Start by adding your desire task in the form.
      </p>
    </section>
  );
}
