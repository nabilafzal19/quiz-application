import "./App.css";
import Question from "./components/Question";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/questions" element={<Question />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Signup /> */}
    </>
  );
}

export default App;
