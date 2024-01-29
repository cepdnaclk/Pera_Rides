// import Barchart from "../../components/barchart/Barchart";
import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import Dashboard from "../../components/dashboard/Dashboard";
// import { useSelector } from "react-redux";

const DashMain = styled.div`
  width: 100%;
  height: 90%;
  padding-left: 30px;
  /* background-color: yellow; */
`;

const BarChartView = () => {
  //   const { revenue } = useSelector((store) => store.paymentStats);

  return (
    <DashMain>
      <HeaderTitle title="dashboard" desc="Executive Overview" />
      <Dashboard />
    </DashMain>
  );
};

export default BarChartView;
