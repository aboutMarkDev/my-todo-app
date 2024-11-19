import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User";
import { useLogout } from "../lib/react-query/queries";

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
    <header className="border-b border-secondary h-[5rem] px-10 max-md:px-5 flex items-center justify-between">
      {isAuthenticated && (
        <h3 className="font-light">
          {user.username ? `Hi, ${user.username}!` : "Loading..."}
        </h3>
      )}
      <div className="flex items-center gap-5">
        {pathname !== "/welcome" && pathname !== "/" && (
          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        )}
        <h1 className="text-xl font-semibold">(Teudo)ongi App</h1>
      </div>
      {isAuthenticated && (
        <button
          className="rounded-lg px-3 py-1 bg-primary text-lg"
          type="button"
          disabled={isLogoutLoading}
          onClick={userLogout}
        >
          {isLogoutLoading ? "Loading..." : "Logout"}
        </button>
      )}
    </header>
  );
}
