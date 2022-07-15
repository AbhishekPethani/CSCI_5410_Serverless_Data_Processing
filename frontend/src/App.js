import { Typography } from "@mui/material";
import SignUp from "./components/UserManagement/SignUp";
import SignIn from "./components/UserManagement/SignIn";
import SignIn_Step1 from "./components/UserManagement/SignIn_Step1";
import SignIn_Step2 from "./components/UserManagement/SignIn_Step2";
import NavBar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/utility";


const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/sign-in" replace={true} />;
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace={true} /> : children;
};

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <Typography align="center" variant="h4" gutterBottom component="div">
        Bed and Breakfast
      </Typography>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/sign-in"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          exact
          path="/sign-in-step1"
          element={
            <PublicRoute>
              <SignIn_Step1 />
            </PublicRoute>
          }
        />

        <Route
          exact
          path="/sign-in-step2"
          element={
            <PublicRoute>
              <SignIn_Step1 />
            </PublicRoute>
          }
        />
      </Routes>

    </div>
  );
}

export default App;