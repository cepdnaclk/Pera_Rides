// import { Link } from "react-router-dom";
import "./NewPassword.css";
import PASSWORD_IMG from "../../assests/password-img.jpg";

const NewPassword = () => {
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
        <form className="password-form">
          <input
            className="password-input"
            type="password"
            name="admin-password"
            id="admin-password"
            placeholder="new password..."
            required
            autoComplete="new-password"
            autoCorrect="off"
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
