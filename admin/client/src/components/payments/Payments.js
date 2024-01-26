import styled from "styled-components";
// import { userPayments } from "../../data";
import OnePayment from "./OnePayment";
import { useEffect, useState } from "react";
import apiConnection from "../../apiConnection";

const PayMain = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: cornflowerblue; */
  margin-top: 10px;
  overflow-y: auto;
`;

const Payments = () => {
  const [userPayments, setUserPayments] = useState([]);

  useEffect(() => {
    const getAllSlips = async () => {
      try {
        const response = await apiConnection.get("/payments");
        setUserPayments(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllSlips();
  }, []);

  return (
    <PayMain>
      {userPayments?.map((payment) => (
        <OnePayment
          key={payment._id}
          slipId={payment._id}
          userId={payment.userId}
          slipImg={payment.image}
          slipDate={payment.updatedAt}
          marked={payment.marked}
        />
      ))}
    </PayMain>
  );
};

export default Payments;
