import "./App.css";
import Question from "./components/Question";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/questions" element={<Question />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <h1>Quiz App</h1> */}
      {/* <Login /> */}
      {/* <Question  /> */}
    </>
  );
}

export default App;
