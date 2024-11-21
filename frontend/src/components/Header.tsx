import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User";
import { useLogout } from "../lib/react-query/queries";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const { isAuthenticated, user, setIsAuthenticated } = useUserContext();

  const { mutateAsync: logout, isPending: isLogoutLoading } = useLogout();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  async function userLogout() {
    try {
      await logout();
      navigate("/welcome");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="border-b border-secondary py-5 px-10 max-md:px-5 max-md:py-3 flex items-center justify-between">
      {isAuthenticated && (
        <h3 className="font-light">
          {user.username ? (
            `Hi, ${user.username}!`
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </h3>
      )}
      <div className="flex items-center gap-1">
        {pathname !== "/welcome" && pathname !== "/" && (
          <Button
            variant="ghost"
            type="button"
            className="h-7 w-7 hover:bg-primary hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
        )}
        <Link to="/" className="text-xl font-semibold">
          (Teudo)ongi App
        </Link>
      </div>
      {isAuthenticated && (
        <Button
          className="bg-primary hover:bg-primary/40 transition-colors duration-200"
          type="button"
          disabled={isLogoutLoading}
          onClick={userLogout}
        >
          {isLogoutLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <LogOut />
              Logout
            </>
          )}
        </Button>
      )}
    </header>
  );
}
