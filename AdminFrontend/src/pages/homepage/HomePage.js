import TopBar from "../../components/topbar/TopBar";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import styled from "styled-components";
import Users from "../users/Users";
import Adduser from "../adduser/Adduser";
import Calendar from "../calendar/Calendar";
import BarChartView from "../BarChartView/BarChartView";
import PieChartView from "../pieChartView/PieChartView";
import StationsView from "../stationsView/StationsView";
import PayView from "../payView/PayView";
import DashView from "../dashboardView/DashView";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* background-color: gray; */
`;

const HomePage = () => {
  const {
    dashboard,
    manageUsers,
    addUser,
    calender,
    pay,
    barChart,
    pieChar,
    stations,
  } = useSelector((store) => store.component);

  const { isOpen } = useSelector((store) => store.modal);
  return (
    <HomepageMainDiv>
      <SideBarContainer>
        <SidebarMenu />
      </SideBarContainer>
      <OthesContainer>
        <TopBar />
        {dashboard && <DashView />}
        {manageUsers && <Users />}
        {addUser && <Adduser />}
        {calender && <Calendar />}
        {barChart && <BarChartView />}
        {pieChar && <PieChartView />}
        {stations && <StationsView />}
        {pay && <PayView />}
      </OthesContainer>
      {isOpen && <Modal />}
    </HomepageMainDiv>
  );
};

export default HomePage;
