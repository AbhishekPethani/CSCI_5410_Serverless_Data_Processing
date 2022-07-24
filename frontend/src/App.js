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
import Rooms from "./components/Rooms";
import Visuals from "./components/Visualization/visualization";
import BookRoom from "./components/Rooms/book";
import OrderMeal from "./components/Meals/order";
import Feedback from "./components/Feedback";
import FeedbackAnalysis from "./components/Feedback/analysis";
import RecommendTour from "./components/Tours/recommend";
import Invoice from "./components/Invoice";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/sign-in" replace={true} />;
};

const PublicRoute = ({ children }) => {
  console.log(children);
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


        <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/security_que_ans" element={<AuthSecurityQueAns />} />
        <Route exact path="/caesar_cipher" element={<CaesarCipher />} />
        <Route exact path="/tours" element={<Tours />} />
        <Route exact path="/recommend-tour" element={<PrivateRoute><RecommendTour /></PrivateRoute>} />
        <Route exact path="/meals" element={<PrivateRoute><Meals /></PrivateRoute>} />
        <Route exact path="/meals/:id/order" element={<PrivateRoute><OrderMeal /></PrivateRoute>} />
        <Route exact path="/feedback/" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route exact path="/feedback-analysis/" element={<PrivateRoute><FeedbackAnalysis /></PrivateRoute>} />
        <Route exact path="/invoice/" element={<PrivateRoute><Invoice /></PrivateRoute>} />
        <Route exact path="/rooms" element={<Rooms />} />
        <Route exact path="/visualization" element={<Visuals/>} />
        <Route exact path="/rooms/:id/book" element={<PrivateRoute><BookRoom /></PrivateRoute>} />
      </Routes>


    </div>
  );
}

export default App;