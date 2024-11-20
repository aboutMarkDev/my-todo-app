import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User";
import toast from "react-hot-toast";
import { useRegister } from "../../../lib/react-query/queries";

type SignUpFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

// PLEASE FIX THE UI FOR RESPONSIVENESS FIRST, THEN DO THE TODO ROUTE IN BACKEND!

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: signUp, isPending: isSigningUp } = useRegister();

  const password = watch("password");

  const navigate = useNavigate();

  const { checkUserAuth } = useUserContext();

  const [isPassShow, setIsPassShow] = useState(false);
  const [isCpassShow, setIsCpassShow] = useState(false);

  async function onSubmit(values: SignUpFormData) {
    console.log(values);
    try {
      const signUpUser = await signUp({
        username: values.username,
        password: values.password,
      });

      toast.success(signUpUser);

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
        className="w-full h-full max-w-2xl mx-auto flex items-center justify-center gap-5 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium">Sign Up</h1>

        {/* Username Field */}
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

        {/* Password Field*/}
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

        {/* Confirm Password Field */}
        <div className="flex flex-col w-full max-w-xs">
          <div className="flex justify-between">
            <label htmlFor="">Confirm Password</label>
            <button
              type="button"
              className="cursor-pointer"
              tabIndex={-1}
              onClick={() => setIsCpassShow(!isCpassShow)}
            >
              {isCpassShow ? "Hide" : "Show"} Password
            </button>
          </div>
          <input
            type={isCpassShow ? "text" : "password"}
            className="border rounded-md h-10 px-5 text-black-100"
            {...register("confirmPassword", {
              required: "Please enter your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors?.confirmPassword && (
            <p className="text-red-400 italic text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <footer className="w-full max-w-xs space-y-2">
          <button
            type="submit"
            disabled={isSigningUp}
            className="bg-primary py-2 w-full max-w-xs rounded-md"
          >
            {isSigningUp ? "Loading..." : "Submit"}
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="hover:underline text-blue-400">
              Sign In here.
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
}
