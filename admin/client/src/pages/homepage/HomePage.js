import "./HomePage.css";
import TopBar from "../../components/topbar/TopBar";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import styled from "styled-components";

const HomepageMainDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SideBarContainer = styled.div`
  flex: 2;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const OthesContainer = styled.div`
  flex: 10;
  height: 100%;
`;

const HomePage = () => {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <HomepageMainDiv>
      <SideBarContainer>
        <SidebarMenu />
      </SideBarContainer>
      <OthesContainer>
        <TopBar />
      </OthesContainer>
      {isOpen && <Modal />}
    </HomepageMainDiv>
  );
};

export default HomePage;
