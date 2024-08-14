import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import { AuthLayout, Login } from './components/index.js';
import LogIn from "./pages/LogIn.jsx";
import AddPost from "./pages/AddPost.jsx";
import AllPost from "./pages/AllPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import SignUp from "./pages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
          path: "/",
          element: <Home />,
      },
      {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <LogIn />
              </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <SignUp />
              </AuthLayout>
          ),
      },
      {
          path: "/all-posts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AllPost />
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);