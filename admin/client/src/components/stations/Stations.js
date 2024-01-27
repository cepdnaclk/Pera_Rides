import styled from "styled-components";
import { useTheme } from "@mui/material";
import StationsTable from "./StationsTable";

const StationsMain = styled.div`
  width: 98%;
  height: 98%;
  margin-top: 10px;
  /* background-color: red; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const AddStationForm = styled.form`
  padding: 10px;
  width: 800px;
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

const QrValueAddForm = styled.form`
  display: flex;
  width: 800px;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-left: 10px;
`;

const Stations = () => {
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const handleAddStation = (e) => {
    e.preventDefault();
  };

  return (
    <StationsMain>
      <AddStationForm>
        <AddStationForm onSubmit={handleAddStation}>
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
            />
            <BTN modes={themeMode} type="submit">
              add
            </BTN>
          </fieldset>
        </AddStationForm>
      </AddStationForm>
      <AllStationsContainer>
        <StationsTable />
      </AllStationsContainer>
      <QrValueAddForm>
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
          />
          <BTN modes={themeMode} type="submit">
            Add
          </BTN>
        </fieldset>
      </QrValueAddForm>
      <QrValueAddForm>
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
          />
          <BTN modes={themeMode} type="submit">
            Remove
          </BTN>
        </fieldset>
      </QrValueAddForm>
    </StationsMain>
  );
};

export default Stations;
