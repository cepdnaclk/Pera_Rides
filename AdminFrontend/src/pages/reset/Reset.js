import { useNavigate } from "react-router-dom";
import "./Reset.css";
import OTP_IMG from "../../assests/otp-img.jpg";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { validate, notValidate } from "../../Redux/features/otp/OtpSlice";
import apiConnection from "../../apiConnection";
///////////////////////////////

const Reset = () => {
  const dispatch = useDispatch();
  const otpRef = useRef();
  const [isOTPcorrect, setIsOTPcorrrect] = useState(false);
  const navigate = useNavigate();

  const handleOTPverify = async (e) => {
    e.preventDefault();
    setIsOTPcorrrect(false);
    try {
      const response = await apiConnection.post("/admin/verifyOTP", {
        otp: otpRef.current.value,
      });
      const isVerified = response.data.response;
      setIsOTPcorrrect(isVerified);
      otpRef.current.value = null;
      navigate("/newpassword");
      dispatch(validate());
    } catch (err) {
      dispatch(notValidate());
      otpRef.current.value = null;
      !isOTPcorrect && alert("Invalid OTP");
      setIsOTPcorrrect(false);
    }
  };

  const handleRegenrateOTP = async () => {
    alert("OTP has been sent successfully!");
    try {
      const response = await apiConnection.get("/admin/generateOtp");
      if (!response) {
        console.log("Error with generating OTP, please try again!");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="reset-main-div">
      <div className="reset-sub-div">
        <div className="reset-title">
          <h1 className="h1">OTP Validation</h1>
          <p className="p">
            Enter 6-digit OTP <br /> sent to an admin's email.
          </p>
        </div>
        <div className="reset-img-container">
          <img
            src={OTP_IMG}
            alt=""
            className="reset-img"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
        <form className="reset-form" onSubmit={handleOTPverify}>
          <input
            className="reset-input"
            type="text"
            name="admin-otp"
            id="admin-otp"
            placeholder="Enter OTP..."
            required
            ref={otpRef}
          />
          <button type="submit" className="reset-btn">
            reset
          </button>
        </form>
        <div className="reset-forgot">
          Don't get OTP?{" "}
          <span onClick={handleRegenrateOTP} className="Link reset-link">
            Resend.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reset;
