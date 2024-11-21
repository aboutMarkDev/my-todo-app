import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/User";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const { isAuthenticated, checkUserAuth } = useUserContext();

  useEffect(() => {
    checkUserAuth();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <article className="flex-grow flex-col flex-icenter w-full max-w-lg mx-auto text-center gap-3 max-md:px-3 py-5">
      <h1 className="text-5xl font-medium">Welcome!</h1>
      <p className="font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae impedit
        obcaecati autem blanditiis dolor debitis officia consequatur quo.
        Ducimus, possimus quis nihil similique laborum architecto eos illum
        eveniet beatae voluptates.
      </p>
      <div className="flex gap-5">
        <Link to="/sign-in">
          <Button className="bg-primary hover:bg-primary/40 transition-colors duration-200">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button className="bg-primary hover:bg-primary/40 transition-colors duration-200">
            Sign Up
          </Button>
        </Link>
      </div>
    </article>
  );
}
