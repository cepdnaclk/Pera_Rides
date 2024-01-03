import { useDispatch } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../Redux/features/modal/modalSlice";
import { logout } from "../../Redux/features/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import { PURGE } from "redux-persist";

const ModalMain = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 1s;
`;

const ModalContainer = styled.div`
  width: 450px;
  height: 150px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #fff;
  transition: all 1s;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ModalQuestion = styled.p`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 15px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  padding-bottom: 5px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBtnContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 10px 10px;
`;

const ModalBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 10px;
  border: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 12px;
  background-color: ${(props) => props.color};
  color: #fff;
  font-weight: bolder;
  border-radius: 10px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    filter: brightness(1.3);
  }
`;

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(closeModal());
    dispatch(logout());
    dispatch({ type: PURGE, key: "persist:root", result: () => null });
    navigate("/login");
  };

  return (
    <ModalMain>
      <ModalContainer>
        <ModalQuestion>
          Do you really want to log out and end your session?
        </ModalQuestion>
        <ModalBtnContainer>
          <ModalBtn color="#005757" onClick={handleLogout}>
            confirm
          </ModalBtn>
          <ModalBtn
            color="darkred"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            cancel
          </ModalBtn>
        </ModalBtnContainer>
      </ModalContainer>
    </ModalMain>
  );
};

export default Modal;
