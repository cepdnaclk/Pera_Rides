import { useContext } from "react";
import "./TopBar.css";
import { Context } from "../../context/Context";

const TopBar = () => {
  const { dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top-bar">
      <li className="li" onClick={handleLogout}>
        logout
      </li>
    </div>
  );
};

export default TopBar;
