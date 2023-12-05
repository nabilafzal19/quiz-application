import "./App.css";
import Question from "./components/Question";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/questions" element={<Question />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Signup /> */}
    </>
  );
}

export default App;
