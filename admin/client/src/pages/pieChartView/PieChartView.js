import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import Piechart from "../../components/pieChart/Piechart";
import { useSelector } from "react-redux";

const PieChartMain = styled.div`
  width: 100%;
  height: 80%;
`;

const StyledP = styled.p`
  width: 95%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  margin: 20px;
  font-size: 20px;
  color: #4cceac;
  border: 1px solid #4cceac;
`;

const PieChartView = () => {
  const { enrollments } = useSelector((store) => store.userStats);

  return (
    <PieChartMain>
      <HeaderTitle
        title={"Enrollment Dynamics"}
        desc={"The monthly user enrollment over the year"}
      />
      {enrollments.length ? (
        <Piechart />
      ) : (
        <StyledP>No enrollments yet</StyledP>
      )}
      <p></p>
    </PieChartMain>
  );
};

export default PieChartView;
