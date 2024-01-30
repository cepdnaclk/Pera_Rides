import styled from "styled-components";
import { useTheme } from "@mui/material";
import StationsTable from "./StationsTable";
import { useEffect, useState } from "react";
import apiConnection from "../../apiConnection";
// import OneQrDetail from "./OneQrDetail";
import { tokens } from "../../theme";
import Content from "./Content";
// import { search } from "../../../../api/routes/adminRoutes/stationRoutes";

const StationsMain = styled.div`
  width: 98%;
  height: 98%;
  margin-top: 10px;
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

const StyledInput = styled.input`
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

const StationsQrBikesContainer = styled.div`
  width: 780px;
  min-height: 200px;
  /* background-color: red; */
  margin-left: 20px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 13px;
  position: sticky;
  top: 0;
  left: 0;
  padding-left: 10px;
`;

const SearchContainer = styled.div`
  position: sticky;
  top: 30px;
  left: 0;
  width: 100%;
  height: 30px;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValuesContainer = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  /* background-color: ; */
  border-bottom: 1px solid #fff;
  /* color: #fff; */

  &::placeholder {
    color: #fff;
  }
`;

const BTNREMOVE = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 13px;
  background-color: red;
  color: #fff;
  font-weight: 700;
  transition-property: background-color;
  transition-duration: 0.7s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: darkred;
  }
`;

const Stations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const themeMode = theme.palette.mode;

  // Add new station
  const [addNewStationName, setAddNewStationName] = useState("");
  const [addNewStationLocation, setAddNewStationLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Add new QR to station
  const [addNewQr, setAddNewQr] = useState("");
  const [addNewQrStationId, setAddNewQrStationId] = useState("");

  // remove a QR from station
  const [removeQr, setRemoveQr] = useState("");
  const [removeQrStationId, setRemoveQrStationId] = useState("");

  // station stats
  const [stationStats, setStationStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // qr-bike available
  const [qrBikeAvailableArray, setQrBikeAvailableArray] = useState([]);
  const [isQrAndBikesLoading, setIsQrAndBikesLoading] = useState(false);

  // search
  const [search, setSearch] = useState("");

  // remove a station
  const [removeStationId, setRemoveStationId] = useState("");

  useEffect(() => {
    const getStationStats = async () => {
      setLoading(false);
      try {
        setLoading(true);
        const response = await apiConnection.get("/info/all/bikes");
        setStationStats(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getStationStats();
  }, []);

  useEffect(() => {
    const getQrAndBikeAvailableStats = async () => {
      setIsQrAndBikesLoading(false);
      try {
        setIsQrAndBikesLoading(true);
        const response = await apiConnection.get("/qr/bike/availability");
        setQrBikeAvailableArray(response.data);
        setIsQrAndBikesLoading(false);
      } catch (err) {
        setIsQrAndBikesLoading(false);
        console.log(err);
      }
    };
    getQrAndBikeAvailableStats();
  }, []);

  // add new station
  const handleAddStation = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Are you sure you need to add this station?");
    if (answer) {
      try {
        const response = await apiConnection.post("/new/station", {
          name: addNewStationName,
          location: addNewStationLocation,
          latitude: latitude,
          longitude: longitude,
        });
        alert("Station added successfully.");
        setAddNewStationName("");
        setAddNewStationLocation("");
        setLatitude("");
        setLongitude("");
        console.log(response.data);
      } catch (err) {
        alert(err.response.data.error);
        console.log(err);
      }
    }
  };

  // add new qr value to station
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

  // remove qr from station
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

  // remove station
  const handleRemoveStation = async (e) => {
    e.preventDefault();
    const answer = window.confirm(
      "Are you sure you need to remove this statio?"
    );
    if (answer) {
      try {
        const response = await apiConnection.delete(
          `/remove/station/${removeStationId}`
        );
        console.log(response.data);
        alert("Station Removed Successfully");
        setRemoveStationId("");
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
          <StyledInput
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
          <StyledInput
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
          <StyledInput
            type="text"
            required
            placeholder="Latitude"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <StyledInput
            type="text"
            required
            placeholder="Longitude"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <BTN modes={themeMode} type="submit">
            add
          </BTN>
        </fieldset>
      </Form>

      {/* Table container  */}

      <AllStationsContainer>
        {loading ? <p>Loading...</p> : <StationsTable stats={stationStats} />}
      </AllStationsContainer>

      {/* Add new QR to station form */}

      <Form onSubmit={handleAddNewQr}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Add a new QR</legend>
          <StyledInput
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
          <StyledInput
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

      <StationsQrBikesContainer
        style={{ backgroundColor: colors.primary[400] }}
      >
        <Title
          style={{
            backgroundColor: colors.primary[400],
            color: colors.greenAccent[500],
          }}
        >
          Type Station ID or QR value to search &nbsp;&nbsp;(&nbsp;Find
          availability of bicycle with corresponding QR in a station)
        </Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0,0,0,0.3)",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          />
        </SearchContainer>
        <ValuesContainer>
          {isQrAndBikesLoading ? (
            <p>Loading...</p>
          ) : qrBikeAvailableArray.length ? (
            <Content
              items={qrBikeAvailableArray?.filter((item) => {
                return item?.qrValue
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })}
              colors={colors}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.greenAccent[500],
                letterSpacing: "1px",
                fontSize: "17px",
              }}
            >
              No Bicycles or QR values available yet
            </div>
          )}
        </ValuesContainer>
      </StationsQrBikesContainer>

      {/* Remove a QR form */}
      <Form onSubmit={handleRemoveQr}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Remove a QR</legend>
          <StyledInput
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
          <StyledInput
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
          <BTNREMOVE modes={themeMode} type="submit">
            Remove
          </BTNREMOVE>
        </fieldset>
      </Form>

      {/* Remove station form */}

      <Form onSubmit={handleRemoveStation}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Remove a station</legend>
          <StyledInput
            type="text"
            required
            placeholder="Station ID"
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.3)",
              color: themeMode === "dark" ? "#fff" : "#000",
              borderColor: themeMode === "dark" ? "#fff" : "#000",
            }}
            value={removeStationId}
            onChange={(e) => setRemoveStationId(e.target.value)}
          />
          <BTNREMOVE modes={themeMode} type="submit">
            Remove
          </BTNREMOVE>
        </fieldset>
      </Form>
    </StationsMain>
  );
};

export default Stations;
