import styled from "styled-components";

const OneDetail = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: yellow; */
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QrValue = styled.div`
  width: 55%;
  height: 85%;
  color: ${(props) => props.textcolour};
  background-color: ${(props) => props.backcolr};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  margin-right: 10px;
`;

const BikeVal = styled.div`
  width: 30%;
  height: 85%;
  color: ${(props) => props.textcolour};
  background-color: ${(props) => props.backcolr};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const OneQrDetail = ({ qrValue, bikeAvailable, clr, backclr }) => {
  return (
    <OneDetail>
      <QrValue textcolour={clr} backcolr={backclr}>
        {qrValue}
      </QrValue>
      <BikeVal textcolour={clr} backcolr={backclr}>
        {bikeAvailable}
      </BikeVal>
    </OneDetail>
  );
};

export default OneQrDetail;
