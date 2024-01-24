import styled from "styled-components";

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
  background-color: #1f2a40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
`;

const P = styled.p`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const IP = styled.input`
  width: 20px;
  height: 20px;
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
`;

const OnePayment = ({ userId, slipImg }) => {
  return (
    <OnePaymentMain>
      <OnePay>
        <IMGconatiner>
          <IMG src={slipImg} alt="payment slip" />
        </IMGconatiner>
        <DetailsContainer>
          <ID>User ID: {userId}</ID>
          <P>
            <Label htmlFor="checkSlip">Mark as done: </Label>
            <IP type="checkbox" id="checkSlip" name="checkSlip" />
          </P>
          <BTN>delete slip</BTN>
        </DetailsContainer>
      </OnePay>
    </OnePaymentMain>
  );
};

export default OnePayment;
