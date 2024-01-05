import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import Piechart from "../../components/pieChart/Piechart";

const PieChartMain = styled.div`
  width: 100%;
  height: 80%;
`;

const PieChartView = () => {
  return (
    <PieChartMain>
      <HeaderTitle
        title={"Enrollment Dynamics"}
        desc={"The monthly user enrollment over the last five months"}
      />
      <Piechart />
    </PieChartMain>
  );
};

export default PieChartView;
