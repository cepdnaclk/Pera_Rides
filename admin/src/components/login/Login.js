import { Link } from "react-router-dom";
import "./Login.css";
import LOGIN_IMG from "../../assests/pera_ride.jpg";

const Login = () => {
  return (
    <div className="login-main-div">
      <div className="login-sub-div">
        <div className="login-title">
          <h1 className="h1">admin login</h1>
          <p className="p">Pera Ride 🚲 Cycle Beyond Limits</p>
        </div>
        <div className="login-img-container">
          <img
            src={LOGIN_IMG}
            alt=""
            className="login-img"
            width={120}
            height={120}
          />
        </div>
        <form className="login-form">
          <input
            className="login-input"
            type="text"
            name="admin-username"
            id="admin-username"
            placeholder="username..."
            required
          />
          <input
            className="login-input"
            type="password"
            name="admin-password"
            id="admin-password"
            placeholder="password..."
            required
            autoComplete="new-password"
            autoCorrect="off"
          />
          <button type="submit" className="login-btn">
            login
          </button>
        </form>
        <div className="login-forgot">
          Forgot Password?{" "}
          <Link to="/reset" className="Link login-link">
            Reset.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
