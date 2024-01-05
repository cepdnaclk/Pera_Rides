import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import LineChart from "../../components/linechart/LineChart";

const LineChartViewMain = styled.div`
  width: 100%;
  height: 80%;
  padding-left: 20px;
`;

const LineChartView = () => {
  return (
    <LineChartViewMain>
      <HeaderTitle title="line chart" desc="add some variation" />
      <LineChart />
    </LineChartViewMain>
  );
};

export default LineChartView;
