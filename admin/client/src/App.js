import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Reset from "./components/reset/Reset";
import NewPassword from "./components/newpassword/NewPassword";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import HomePage from "./components/homepage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
