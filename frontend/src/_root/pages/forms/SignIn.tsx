import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../../lib/react-query/queries";
import { useUserContext } from "../../../context/User";
import toast from "react-hot-toast";

type SignInFormData = {
  username: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutateAsync: signIn, isPending: isSigningIn } = useLogin();

  const navigate = useNavigate();

  const { checkUserAuth } = useUserContext();

  const [isPassShow, setIsPassShow] = useState(false);

  async function onSubmit(values: SignInFormData) {
    try {
      const signInUser = await signIn(values);

      toast.success(signInUser);

      reset();

      const isUserLoggedIn = await checkUserAuth();

      if (isUserLoggedIn) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <section className="flex-grow py-5">
      <form
        action=""
        className="w-full h-full max-w-2xl mx-auto flex items-center justify-center gap-8 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium">Sign In</h1>

        <div className="flex flex-col w-full max-w-xs">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="border rounded-md h-10 px-5 text-black-100"
            {...register("username", {
              required: "Required",
            })}
          />
          {errors?.username && (
            <p className="text-red-400 italic text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <div className="flex justify-between">
            <label htmlFor="">Password</label>
            <button
              type="button"
              className="cursor-pointer"
              tabIndex={-1}
              onClick={() => setIsPassShow(!isPassShow)}
            >
              {isPassShow ? "Hide" : "Show"} Password
            </button>
          </div>
          <input
            type={isPassShow ? "text" : "password"}
            className="border rounded-md h-10 px-5 text-black-100"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters long",
              },
            })}
          />
          {errors?.password && (
            <p className="text-red-400 italic text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <footer className="w-full max-w-xs space-y-2">
          <button
            type="submit"
            disabled={isSigningIn}
            className="bg-primary py-2 w-full max-w-xs rounded-md"
          >
            {isSigningIn ? "Loading..." : "Sign in"}
          </button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="hover:underline text-blue-400">
              Sign Up here.
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
}
