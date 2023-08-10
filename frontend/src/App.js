import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const App = () => {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
};
export default App;
