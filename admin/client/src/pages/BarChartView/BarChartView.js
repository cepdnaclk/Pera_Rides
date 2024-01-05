import Barchart from "../../components/barchart/Barchart";
import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";

const BarChartMain = styled.div`
  width: 100%;
  height: 80%;
`;

const BarChartView = () => {
  return (
    <BarChartMain>
      <HeaderTitle
        title="Earnings Fluctuations"
        desc="revenue gained in last seven months"
      />
      <Barchart isInDashboard={false} />
    </BarChartMain>
  );
};

export default BarChartView;
