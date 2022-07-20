import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import SignUp from "./components/UserManagement/SignUp";
import SignIn from "./components/UserManagement/SignIn";
import NavBar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/utility";
import AuthSecurityQueAns from "./components/UserManagement/AuthSecurityQueAns";
import CaesarCipher from "./components/UserManagement/CaesarCipher";
import Tours from "./components/Tours";
import Meals from "./components/Meals";
import BookTour from "./components/Tours/book";
import Rooms from "./components/Rooms";
import BookRoom from "./components/Rooms/book";
import OrderMeal from "./components/Meals/order";
import Feedback from "./components/Feedback";
import FeedbackAnalysis from "./components/Feedback/analysis";

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
          path="/dashboard"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
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


        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/security_que_ans" element={<AuthSecurityQueAns />} />
        <Route exact path="/caesar_cipher" element={<CaesarCipher />} />
        <Route exact path="/tours" element={<Tours />} />
        <Route exact path="/meals" element={<Meals />} />
        <Route exact path="/meals/:id/order" element={<OrderMeal />} />
        <Route exact path="/feedback/" element={<Feedback />} />
        <Route exact path="/feedback-analysis/" element={<FeedbackAnalysis />} />

        <Route exact path="/tours/2/book" element={<BookTour />} />
        <Route exact path="/rooms" element={<Rooms />} />
        <Route exact path="/rooms/:id/book" element={<BookRoom />} />
      </Routes>


    </div>
  );
}

export default App;