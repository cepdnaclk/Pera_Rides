// import { Link } from "react-router-dom";
import "./NewPassword.css";
import PASSWORD_IMG from "../../assests/password-img.jpg";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const resetPasswordRef = useRef();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== resetPasswordRef.current.value) {
      alert("Two passwords must be match!");
      passwordRef.current.value = null;
      resetPasswordRef.current.value = null;
    } else {
      // const response = await axios.post("/resetpassword", {
      //   newpassword: passwordRef.current.value,
      // });
      // alert("Password updated successfully!");
      // navigate("/login");
      // console.log(response);
      await axios.post("/resetpassword", {
        newpassword: passwordRef.current.value,
      });
      alert("Password updated successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="password-main-div">
      <div className="password-sub-div">
        <div className="password-title">
          <h1 className="h1">reset password</h1>
          <p className="p">Add new Password for Admin</p>
        </div>
        <div className="password-img-container">
          <img
            src={PASSWORD_IMG}
            alt=""
            className="password-img"
            width={120}
            height={120}
          />
        </div>
        <form className="password-form" onSubmit={handlePasswordReset}>
          <input
            className="password-input"
            type="password"
            name="admin-password"
            id="admin-password"
            placeholder="new password..."
            required
            autoComplete="new-password"
            autoCorrect="off"
            ref={passwordRef}
          />
          <input
            className="password-input"
            type="password"
            name="admin-password"
            id="admin-password-repeat"
            placeholder="repeat new password..."
            required
            autoComplete="new-password"
            autoCorrect="off"
            ref={resetPasswordRef}
          />
          <button type="submit" className="password-btn">
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
