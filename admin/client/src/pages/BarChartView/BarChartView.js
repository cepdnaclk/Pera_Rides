import Barchart from "../../components/barchart/Barchart";
import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";

const BarChartMain = styled.div`
  width: 100%;
  height: 80%;
  padding-left: 30px;
`;

const Bar = styled.div`
  width: 100%;
  height: 80vh;
  padding-left: 20px;
`;

const BarChartView = () => {
  return (
    <BarChartMain>
      <HeaderTitle
        title="Earnings Fluctuations"
        desc="revenue gained per month over the year"
      />
      <Bar>
        <Barchart isInDashboard={false} />
      </Bar>
    </BarChartMain>
  );
};

export default BarChartView;
