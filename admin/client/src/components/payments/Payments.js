import styled from "styled-components";
import OnePayment from "./OnePayment";
import { useEffect, useState } from "react";
import apiConnection from "../../apiConnection";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const PayMain = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  overflow-y: auto;
`;

const NoSlipP = styled.div`
  border: 1px solid ${(props) => props.clr};
  color: ${(props) => props.clr};
  letter-spacing: 1px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userPayments, setUserPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllSlips = async () => {
      setIsLoading(false);
      try {
        setIsLoading(true);
        const response = await apiConnection.get("/payments");
        setUserPayments(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getAllSlips();
  }, []);

  const removeSlip = (slipId) => {
    const newPayments = userPayments.filter(
      (paymnet) => paymnet._id !== slipId
    );
    setUserPayments(newPayments);
  };

  return (
    <PayMain>
      {isLoading ? (
        <p style={{ padding: "50px", fontSize: "20px" }}>Loading...</p>
      ) : userPayments.length ? (
        userPayments?.map((payment) => (
          <OnePayment
            key={payment._id}
            slipId={payment._id}
            userId={payment.userId}
            slipImg={payment.image}
            marked={payment.marked}
            removeSlip={removeSlip}
            postedDate={payment.createdAt}
            revenueUpdated={payment.revenueUpdated}
          />
        ))
      ) : (
        <NoSlipP clr={colors.greenAccent[500]}>
          No Payment slips available
        </NoSlipP>
      )}
    </PayMain>
  );
};

export default Payments;
