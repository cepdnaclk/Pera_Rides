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
  width: 25%;
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

const OnePayment = ({ userId, slipImg, slipDate, marked, slipId }) => {
  const theme = useTheme();
  const [income, setIncome] = useState("");
  const [incomeUpdated, setIncomeUpdated] = useState(false);
  const [markAsDone, setMarkAsDone] = useState(marked);

  const handleUpdateIncome = (e) => {
    e.preventDefault();
    alert("Icome successfully updated");
    setIncomeUpdated(true);
    setIncome("");
    console.log(slipDate);
    console.log(income);
    console.log(typeof income);
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
            <BTN>Mark as done</BTN>
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
            <BTN type="submit" disabled={incomeUpdated}>
              update
            </BTN>
          </Form>
          <BTN>delete slip</BTN>
        </DetailsContainer>
      </OnePay>
    </OnePaymentMain>
  );
};

export default OnePayment;
