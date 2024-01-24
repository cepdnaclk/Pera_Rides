import styled from "styled-components";
import { userPayments } from "../../data";
import OnePayment from "./OnePayment";

const PayMain = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: cornflowerblue; */
  margin-top: 10px;
  overflow-y: auto;
`;

const Payments = () => {
  return (
    <PayMain>
      {userPayments.map((payment) => (
        <OnePayment
          key={payment.id}
          userId={payment.userId}
          slipImg={payment.img}
        />
      ))}
    </PayMain>
  );
};

export default Payments;
