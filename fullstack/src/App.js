import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import RequireUser from "./components/RequireUser";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
