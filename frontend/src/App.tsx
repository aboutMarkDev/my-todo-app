import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Welcome from "./_root/pages/Welcome";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Welcome />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
