import { useState } from "react";
import AddTodoForm from "../../components/AddTodoForm";

const lists = [
  "Sample1asdasdsads asdasd asd asdasdsa asd asd asdasdsa asdasdsadasdsadasdasdas asdasdadasdasdsadasd",
  "Sample2",
  "Sample3",
  "Sample4",
  "Sample5",
  "Sample6",
  "Sample7",
  "Sample8",
];

export default function User() {
  const [isEditing, setIsEditing] = useState("");

  return (
    <section className="flex-grow grid md:grid-cols-3 max-md:grid-rows-3 overflow-hidden">
      <article className="md:border-r max-md:border-t border-secondary md:col-span-2 max-md:order-last max-md:row-span-2 overflow-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-secondary">
        <ul className="px-3 py-5 space-y-5">
          {lists.map((list, i) => {
            return (
              <li key={i} className="flex items-center justify-between h-8">
                {isEditing === list ? (
                  <>
                    <input
                      type="text"
                      value={list}
                      className="rounded-md h-8 px-5 text-primary"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing("");
                        }}
                        className="rounded-md bg-green-400 px-5 py-1 text-black-100"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-red-400 px-5 py-1 text-black-100"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="px-1 line-clamp-2">{list}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(list)}
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
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </article>

      <article className="px-3 py-5">
        <AddTodoForm />
      </article>
    </section>
  );
}
