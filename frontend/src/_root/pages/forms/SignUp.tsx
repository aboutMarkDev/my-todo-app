import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User";
import toast from "react-hot-toast";
import { useRegister } from "../../../lib/react-query/queries";
import { Input } from "@/components/ui/input";
import InputWarningMessage from "@/components/InputWarningMessage";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const { checkUserAuth, isAuthenticated } = useUserContext();

  const [isPassShow, setIsPassShow] = useState(false);
  const [isCpassShow, setIsCpassShow] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        className="w-full h-full max-w-2xl mx-auto flex items-center justify-center gap-5 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium">Sign Up</h1>

        {/* Username Field */}
        <div className="flex flex-col w-full gap-1 max-w-xs">
          <label htmlFor="">Username</label>
          <Input
            type="text"
            className="px-5"
            {...register("username", {
              required: "Required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long.",
              },
            })}
          />
          {errors?.username && (
            <InputWarningMessage errorMessage={errors.username.message || ""} />
          )}
        </div>

        {/* Password Field*/}
        <div className="flex flex-col w-full max-w-xs">
          <div className="flex items-center justify-between">
            <label htmlFor="">Password</label>
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-transparent hover:bg-transparent shadow-none"
              tabIndex={-1}
              onClick={() => setIsPassShow(!isPassShow)}
            >
              {isPassShow ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
          <div className="space-y-1">
            <Input
              type={isPassShow ? "text" : "password"}
              className="px-5"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
              })}
            />
            {errors?.password && (
              <InputWarningMessage
                errorMessage={errors.password.message || ""}
              />
            )}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col w-full max-w-xs">
          <div className="flex items-center justify-between">
            <label htmlFor="">Confirm Password</label>
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-transparent hover:bg-transparent shadow-none"
              tabIndex={-1}
              onClick={() => setIsCpassShow(!isCpassShow)}
            >
              {isCpassShow ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
          <div className="space-y-1">
            <Input
              type={isCpassShow ? "text" : "password"}
              className="px-5 "
              {...register("confirmPassword", {
                required: "Please enter your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors?.confirmPassword && (
              <InputWarningMessage
                errorMessage={errors.confirmPassword.message || ""}
              />
            )}
          </div>
        </div>

        {/* Button */}
        <footer className="w-full max-w-xs space-y-1">
          <Button
            type="submit"
            disabled={isSigningUp}
            className="bg-primary hover:bg-primary/40 transition-colors duration-200 w-full"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
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
