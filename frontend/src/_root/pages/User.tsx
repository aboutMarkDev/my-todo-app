import { useEffect } from "react";
import AddTodoForm from "../../components/AddTodoForm";
import { useUserContext } from "../../context/User";
import { Navigate } from "react-router-dom";
import TodoList from "@/components/TodoList";

export default function User() {
  const { isAuthenticated, checkUserAuth } = useUserContext();

  useEffect(() => {
    checkUserAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  return (
    <section className="flex-grow grid md:grid-cols-3 max-md:grid-rows-3 overflow-hidden">
      <article className="md:border-r max-md:border-t border-secondary md:col-span-2 max-md:order-last max-md:row-span-2 overflow-auto custom-scrollbar">
        <TodoList />
      </article>

      <article className="overflow-auto custom-scrollbar">
        <AddTodoForm />
      </article>
    </section>
  );
}
