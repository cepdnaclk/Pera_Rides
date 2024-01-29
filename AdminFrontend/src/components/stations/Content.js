// import styled from "styled-components";
import OneQrDetail from "./OneQrDetail";

const Content = ({ colors, items }) => {
  return (
    <>
      {items?.map((detail) => (
        <OneQrDetail
          key={detail._id}
          qrValue={detail.qrValue}
          bikeAvailable={detail.bikeAvailable}
          clr={colors.greenAccent[500]}
          backclr={colors.primary[500]}
        />
      ))}
    </>
  );
};

export default Content;
