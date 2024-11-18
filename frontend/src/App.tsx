import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Welcome from "./_root/pages/Welcome";
import SignIn from "./_root/pages/forms/SignIn";
import User from "./_root/pages/User";
import SignUp from "./_root/pages/forms/SignUp";

export default function App() {
  const isAuthenticated = true;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={isAuthenticated ? <User /> : <Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
