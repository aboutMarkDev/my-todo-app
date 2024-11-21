import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../../../lib/react-query/queries";
import { useUserContext } from "../../../context/User";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import InputWarningMessage from "@/components/InputWarningMessage";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

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

  const { checkUserAuth, isAuthenticated } = useUserContext();

  const [isPassShow, setIsPassShow] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        className="w-full h-full max-w-2xl mx-auto flex items-center justify-center gap-8 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium">Sign In</h1>

        <div className="flex flex-col w-full gap-1 max-w-xs">
          <label htmlFor="username">Username</label>
          <div className="space-y-1">
            <Input
              id="username"
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
              <InputWarningMessage
                errorMessage={errors.username.message || ""}
              />
            )}
          </div>
        </div>

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

        <footer className="w-full max-w-xs space-y-1">
          <Button
            type="submit"
            disabled={isSigningIn}
            className="bg-primary hover:bg-primary/40 transition-colors duration-200 w-full"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
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
