import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Reset from "./pages/reset/Reset";
import NewPassword from "./pages/newpassword/NewPassword";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import HomePage from "./pages/homepage/HomePage";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();

  const { currentAdmin } = useSelector((store) => store.admin);
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
