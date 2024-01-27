import styled from "styled-components";
import { useTheme } from "@mui/material";
import { useState } from "react";
import apiConnection from "../../apiConnection";

const OnePaymentMain = styled.div`
  margin-bottom: 20px;
  padding: 10px;
`;

const OnePay = styled.div`
  display: flex;
`;

const IMGconatiner = styled.div`
  width: 50%;
  height: auto;
`;

const DetailsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IMG = styled.img`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ID = styled.div`
  width: 70%;
  background-color: ${(props) =>
    props.mode === "dark" ? "#1f2a40" : "lightgray"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const IPCHECK = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const BTN = styled.button`
  width: 30%;
  padding: 10px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 1s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  background-color: #2e7c67;
  color: #fff;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: capitalize;
  font-size: 12px;
  border: none;
  outline: none;
  border-radius: 5px;
  &:hover {
    background-color: #1e5245;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #999;
  }
`;

const Form = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 200px;
  height: 100%;
  margin-right: 10px;
  border: none;
  outline: none;
  padding: 10px;
  border-bottom: 1px solid
    ${(props) => (props.mode === "dark" ? "#fff" : "#000")};
  background-color: ${(props) =>
    props.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "lightgray"};
  color: ${(props) => (props.mode === "dark" ? "#fff" : "#000")};

  &::placeholder {
    color: ${(props) => (props.mode === "dark" ? "#fff" : "#000")};
  }
`;

const OnePayment = ({
  userId,
  slipImg,
  marked,
  slipId,
  removeSlip,
  postedDate,
  revenueUpdated,
}) => {
  const theme = useTheme();
  const [income, setIncome] = useState("");
  // const [incomeUpdated, setIncomeUpdated] = useState(false);
  const [revenue, setRevenue] = useState(revenueUpdated);
  const [markAsDone, setMarkAsDone] = useState(marked);

  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    try {
      const responseIncomeUpdate = await apiConnection.post("/create/income", {
        amount: income,
        userID: userId,
        paymentDate: postedDate,
      });

      const responseRevenueUpdate = await apiConnection.patch("/slip/updated", {
        slipId: slipId,
      });

      alert("Income Updated!");
      setIncome("");
      console.log("Income: ", responseIncomeUpdate.data);
      console.log("Revenue: ", responseRevenueUpdate.data);
      setRevenue(true);
    } catch (err) {
      setRevenue(false);
      console.log(err);
    }

    // try {
    //   const response = await apiConnection.patch("/slip/updated", {
    //     slipId: slipId,
    //   });
    //   console.log(response);
    //   setRevenueUpdated(true);
    // } catch (err) {
    //   setRevenueUpdated(false);
    //   console.log(err);
    // }
  };

  const handleCheckChange = async (e) => {
    e.preventDefault();

    try {
      const response = await apiConnection.patch("/checkchange", {
        slipId: slipId,
        marked: markAsDone,
      });
      alert(response.data);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSlip = async () => {
    const answer = window.confirm("Are you really need to delete this slip?");
    if (answer) {
      try {
        const response = await apiConnection.delete(`/deleteSlip/${slipId}`);
        removeSlip(slipId);
        alert(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(postedDate);

  return (
    <OnePaymentMain>
      <OnePay>
        <IMGconatiner>
          <IMG src={slipImg} alt="payment slip" />
        </IMGconatiner>
        <DetailsContainer>
          <ID mode={theme.palette.mode}>User ID: {userId}</ID>
          <Form onSubmit={handleCheckChange}>
            <IPCHECK
              type="checkbox"
              id={`checkSlip_${userId}`}
              name={`checkSlip_${userId}`}
              checked={markAsDone}
              onChange={(e) => setMarkAsDone(e.target.checked)}
            />
            <BTN>{markAsDone ? "Mark as done" : "Mark as not done"}</BTN>
          </Form>
          <Form onSubmit={handleUpdateIncome}>
            <Input
              mode={theme.palette.mode}
              type="number"
              name={`incomeVal_${userId}`}
              id={`incomeVal_${userId}`}
              placeholder="Update income..."
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <BTN type="submit" disabled={revenue}>
              {revenue ? "updated" : "update"}
            </BTN>
          </Form>
          <BTN onClick={handleDeleteSlip}>delete slip</BTN>
        </DetailsContainer>
      </OnePay>
    </OnePaymentMain>
  );
};

export default OnePayment;
