import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import NewPassword from "./pages/newpassword/NewPassword";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import HomePage from "./pages/homepage/HomePage";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersDB } from "./Redux/features/users/usersSlice";
import { useEffect } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const { currentAdmin } = useSelector((store) => store.admin);
  const { allUsers } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getAllUsersDB());
  }, [dispatch, allUsers]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
              element={currentAdmin ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={currentAdmin ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/reset"
              element={currentAdmin ? <Navigate to="/" /> : <Reset />}
            />
            <Route
              path="/newpassword"
              element={
                !currentAdmin ? (
                  <Navigate to="/login" />
                ) : currentAdmin ? (
                  <Navigate to="/" />
                ) : (
                  <NewPassword />
                )
              }
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
