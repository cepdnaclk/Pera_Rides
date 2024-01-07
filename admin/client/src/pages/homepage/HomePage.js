import TopBar from "../../components/topbar/TopBar";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import SidebarMenu from "../../components/sidebar/SidebarMenu";
import styled from "styled-components";
import Dashboard from "../../components/dashboard/Dashboard";
import Users from "../users/Users";
import Adduser from "../adduser/Adduser";
import Calendar from "../calendar/Calendar";
import BarChartView from "../BarChartView/BarChartView";
import PieChartView from "../pieChartView/PieChartView";
import LineChartView from "../lineChartView/LineChartView";

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
    // faq,
    barChart,
    pieChar,
    lineChart,
  } = useSelector((store) => store.component);

  const { isOpen } = useSelector((store) => store.modal);
  return (
    <HomepageMainDiv>
      <SideBarContainer>
        <SidebarMenu />
      </SideBarContainer>
      <OthesContainer>
        <TopBar />
        {dashboard && <Dashboard />}
        {manageUsers && <Users />}
        {addUser && <Adduser />}
        {calender && <Calendar />}
        {barChart && <BarChartView />}
        {pieChar && <PieChartView />}
        {lineChart && <LineChartView />}
      </OthesContainer>
      {isOpen && <Modal />}
    </HomepageMainDiv>
  );
};

export default HomePage;
