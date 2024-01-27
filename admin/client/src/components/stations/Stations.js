import styled from "styled-components";
import { useTheme } from "@mui/material";
import StationsTable from "./StationsTable";
import { useState } from "react";
import apiConnection from "../../apiConnection";

const StationsMain = styled.div`
  width: 98%;
  height: 98%;
  margin-top: 10px;
  /* background-color: red; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  width: 800px;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-left: 10px;
`;

const AddStationInput = styled.input`
  width: 300px;
  height: 40px;
  margin-right: 20px;
  border: none;
  outline: none;
  border-bottom: 1px solid #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  color: #fff;
  margin-bottom: 10px;
  &::placeholder {
    color: #fff;
    font-weight: 400;
  }
`;

const BTN = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 13px;
  background-color: ${(props) => (props.modes === "dark" ? "#3da58a" : "#000")};
  color: ${(props) => (props.modes === "dark" ? "#000" : "#fff")};
  font-weight: 700;
  transition-property: background-color;
  transition-duration: 0.7s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.modes === "dark" ? "limegreen" : "#444"};
  }
`;

const AllStationsContainer = styled.div`
  width: 800px;
  min-height: 300px;
  margin-top: 10px;
  overflow-y: auto;
  padding: 10px;
  margin-left: 10px;
`;

const Stations = () => {
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  // Add new station
  const [addNewStationName, setAddNewStationName] = useState("");
  const [addNewStationLocation, setAddNewStationLocation] = useState("");

  // Add new QR to station
  const [addNewQr, setAddNewQr] = useState("");
  const [addNewQrStationId, setAddNewQrStationId] = useState("");

  // remove a QR from station
  const [removeQr, setRemoveQr] = useState("");
  const [removeQrStationId, setRemoveQrStationId] = useState("");

  const handleAddStation = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Are you sure you need to add this station?");
    if (answer) {
      try {
        const response = await apiConnection.post("/new/station", {
          name: addNewStationName,
          location: addNewStationLocation,
        });
        alert("Station added successfully.");
        setAddNewStationName("");
        setAddNewStationLocation("");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddNewQr = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Are you sure you need to add this QR?");
    if (answer) {
      try {
        const response = await apiConnection.patch(
          `/new/qr/${addNewQrStationId}`,
          {
            qrValue: addNewQr,
          }
        );
        alert("QR added successfully.");
        setAddNewQr("");
        setAddNewQrStationId("");

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRemoveQr = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Are you sure you need to remove this QR?");
    if (answer) {
      try {
        const response = await apiConnection.patch(
          `/remove/qr/${removeQrStationId}`,
          {
            qrValue: removeQr,
          }
        );
        alert("QR removed successfully.");
        setRemoveQr("");
        setRemoveQrStationId("");

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <StationsMain>
      {/* Add new station form */}
      <Form onSubmit={handleAddStation}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Add New Station</legend>
          <AddStationInput
            type="text"
            required
            placeholder="Station Name"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={addNewStationName}
            onChange={(e) => setAddNewStationName(e.target.value)}
          />
          <AddStationInput
            type="text"
            required
            placeholder="Station Location"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={addNewStationLocation}
            onChange={(e) => setAddNewStationLocation(e.target.value)}
          />
          <BTN modes={themeMode} type="submit">
            add
          </BTN>
        </fieldset>
      </Form>

      {/* Table container  */}

      <AllStationsContainer>
        <StationsTable />
      </AllStationsContainer>

      {/* Add new QR to station form */}

      <Form onSubmit={handleAddNewQr}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Add a new QR</legend>
          <AddStationInput
            type="text"
            required
            placeholder="QR Value"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={addNewQr}
            onChange={(e) => setAddNewQr(e.target.value)}
          />
          <AddStationInput
            type="text"
            required
            placeholder="Station Id"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={addNewQrStationId}
            onChange={(e) => setAddNewQrStationId(e.target.value)}
          />
          <BTN modes={themeMode} type="submit">
            Add
          </BTN>
        </fieldset>
      </Form>

      {/* Remove a QR form */}
      <Form onSubmit={handleRemoveQr}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Remove a QR</legend>
          <AddStationInput
            type="text"
            required
            placeholder="QR Value"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={removeQr}
            onChange={(e) => setRemoveQr(e.target.value)}
          />
          <AddStationInput
            type="text"
            required
            placeholder="Station Id"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={removeQrStationId}
            onChange={(e) => setRemoveQrStationId(e.target.value)}
          />
          <BTN modes={themeMode} type="submit">
            Remove
          </BTN>
        </fieldset>
      </Form>
    </StationsMain>
  );
};

export default Stations;
