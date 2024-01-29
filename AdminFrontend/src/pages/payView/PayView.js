import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import Payments from "../../components/payments/Payments";

const PayViewMain = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;
`;

const PayView = () => {
  return (
    <PayViewMain>
      <HeaderTitle title="user payments" desc="check user payments here" />
      <Payments />
    </PayViewMain>
  );
};

export default PayView;
