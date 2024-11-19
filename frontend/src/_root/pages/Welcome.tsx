import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/User";
import { useEffect, useState } from "react";

export default function Welcome() {
  const { isAuthenticated, checkUserAuth } = useUserContext();

  useEffect(() => {
    checkUserAuth();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <article className="flex-grow flex-col flex-icenter w-full max-w-lg mx-auto text-center gap-3 max-md:px-3">
      <h1 className="text-5xl font-medium">Welcome!</h1>
      <p className="font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae impedit
        obcaecati autem blanditiis dolor debitis officia consequatur quo.
        Ducimus, possimus quis nihil similique laborum architecto eos illum
        eveniet beatae voluptates.
      </p>
      <div className="flex gap-5">
        <Link to="/sign-in" className="bg-primary px-3 py-1 rounded-lg text-lg">
          Sign In
        </Link>
        <Link to="/sign-up" className="bg-primary px-3 py-1 rounded-lg text-lg">
          Sign Up
        </Link>
      </div>
    </article>
  );
}
