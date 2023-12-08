import { Link } from "react-router-dom";
import "./Login.css";
import LOGIN_IMG from "../../assests/pera_ride.jpg";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
  const { isFetching, dispatch } = useContext(Context);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(response);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(`Error: ${err.message}`);
    }
  };

  // const handleOTPgenerate = async () => {
  //   alert("OTP has been sent successfully!");
  //   try {
  //     const response = await axios.get("/generateOTP");
  //     if (!response) {
  //       console.log("Error with generating OTP, please try again!");
  //     }
  //     const OTP = response.data; // string
  //     console.log(OTP);
  //     dispatch({ type: "GENERATE_OTP", payload: OTP });
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // };

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
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            name="admin-username"
            id="admin-username"
            placeholder="username..."
            required
            ref={usernameRef}
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
            ref={passwordRef}
          />
          <button type="submit" className="login-btn" disabled={isFetching}>
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
