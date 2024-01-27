import Barchart from "../../components/barchart/Barchart";
import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import { useSelector } from "react-redux";

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

const StyledP = styled.p`
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  margin: 20px 20px 20px 0;
  font-size: 20px;
  color: #4cceac;
  border: 1px solid #4cceac;
`;

const BarChartView = () => {
  const { revenue } = useSelector((store) => store.paymentStats);

  return (
    <BarChartMain>
      <HeaderTitle
        title="Earnings Fluctuations"
        desc="revenue gained per month over the year"
      />
      <Bar>
        {revenue.length ? (
          <Barchart isInDashboard={false} />
        ) : (
          <StyledP>No revenue yet</StyledP>
        )}
      </Bar>
    </BarChartMain>
  );
};

export default BarChartView;
