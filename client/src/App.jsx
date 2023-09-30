import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersistLogin from "./components/PersistLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <Account />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
  ]);
  return (
    <PersistLogin>
      <div className="flex justify-center flex-col gap-10 lg:max-w-[1200px] mx-auto items-center ">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </PersistLogin>
  );
}

export default App;
