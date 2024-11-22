import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import SignIn from "./_root/pages/forms/SignIn";
import SignUp from "./_root/pages/forms/SignUp";

import User from "./_root/pages/User";
import Welcome from "./_root/pages/Welcome";
import { Toaster } from "react-hot-toast";

// Create router
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={<User />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
