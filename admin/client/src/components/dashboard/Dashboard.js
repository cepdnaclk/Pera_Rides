import styled from "styled-components";
import HeaderTitle from "../headerTitle/HeaderTitle";

const DashboardMain = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

const Dashboard = () => {
  return (
    <DashboardMain>
      <HeaderTitle title={"Dashboard"} desc="welcome to your dashboard" />
    </DashboardMain>
  );
};

export default Dashboard;
