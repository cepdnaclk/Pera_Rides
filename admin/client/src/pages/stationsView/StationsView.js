import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import Stations from "../../components/stations/Stations";

const StationsViewMain = styled.div`
  width: 100%;
  height: 80%;
  padding-left: 20px;
`;

const StationsView = () => {
  return (
    <StationsViewMain>
      <HeaderTitle
        title="stations"
        desc="add new stations and manage available stations"
      />
      <Stations />
    </StationsViewMain>
  );
};

export default StationsView;
