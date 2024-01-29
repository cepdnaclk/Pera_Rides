import {
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BarChart from "../barchart/Barchart";
import PieChart from "../pieChart/Piechart";
import styled from "styled-components";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import apiConnection from "../../apiConnection";
import { useEffect, useState } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useSelector } from "react-redux";
import InsightsIcon from "@mui/icons-material/Insights";
import EqualizerIcon from "@mui/icons-material/Equalizer";

const DashboardMain = styled.div`
  width: 97%;
  height: 85%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const StatsContainer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const OneStatContainer = styled.div`
  width: 23%;
  height: 100%;
  background-color: ${(props) => props.backcolor};
  display: flex;
`;

const OneStatLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

const LeftAmountContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 15px;
  letter-spacing: 1px;
`;
const LeftTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 10px;
  letter-spacing: 1px;
  color: ${(props) => props.clr};
`;

const OneStatRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightIconContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GraphsContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
`;

const OneGraphContainer = styled.div`
  width: 33%;
  height: 100%;
  background-color: ${(props) => props.backcolor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChartDiv = styled.div`
  width: 95%;
  height: 95%;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { allUsers } = useSelector((store) => store.users);
  const { revenue } = useSelector((store) => store.paymentStats);
  const { enrollments } = useSelector((store) => store.userStats);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [fullIncome, setFullIncome] = useState(0);
  const [availableBikes, setAvailableBikes] = useState(0);
  const [totalStations, setTotalStations] = useState(0);

  useEffect(() => {
    const getCalendarEvents = async () => {
      try {
        const response = await apiConnection.get("/calendar/all");
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
        }));
        setCurrentEvents(formattedEvents);
      } catch (err) {
        console.log(err);
      }
    };
    getCalendarEvents();
  }, [currentEvents]);

  useEffect(() => {
    const getFullIncome = async () => {
      try {
        const response = await apiConnection.get("/total/income");
        setFullIncome(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFullIncome();
  }, [fullIncome]);

  useEffect(() => {
    const getAvailableBikes = async () => {
      try {
        const response = await apiConnection.get("/total/bicycles");
        setAvailableBikes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAvailableBikes();
  }, [availableBikes]);

  useEffect(() => {
    const getTotalStations = async () => {
      try {
        const response = await apiConnection.get("/total/stations");
        setTotalStations(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTotalStations();
  }, [totalStations]);

  return (
    <DashboardMain>
      <StatsContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>{allUsers?.length || 0}</LeftAmountContainer>
            <LeftTitleContainer clr={colors.greenAccent[500]}>
              Total Users
            </LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <PeopleAltIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>{fullIncome}</LeftAmountContainer>
            <LeftTitleContainer clr={colors.greenAccent[500]}>
              Total Income
            </LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <LocalAtmIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>{totalStations}</LeftAmountContainer>
            <LeftTitleContainer clr={colors.greenAccent[500]}>
              Total Stations
            </LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <LocalParkingIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>{availableBikes}</LeftAmountContainer>
            <LeftTitleContainer clr={colors.greenAccent[500]}>
              Bicycle availability in stations
            </LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <PedalBikeIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
      </StatsContainer>
      <GraphsContainer>
        <OneGraphContainer backcolor={colors.primary[400]}>
          <ChartDiv>
            {revenue?.length ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    // background: colors.gray[600],
                    color: colors.gray[100],
                    textAlign: "end",
                    padding: "2px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  <EqualizerIcon />
                </div>
                <BarChart isDashboard={true} />
                <div
                  style={{
                    // background: colors.gray[700],
                    color: colors.greenAccent[500],
                    textAlign: "center",
                    padding: "2px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                    fontSize: "12px",
                  }}
                >
                  variation of the income
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${colors.greenAccent[500]}`,
                  color: colors.greenAccent[500],
                  letterSpacing: "1px",
                }}
              >
                No earnings for this year yet.
              </div>
            )}
          </ChartDiv>
        </OneGraphContainer>
        <OneGraphContainer backcolor={colors.primary[400]}>
          <ChartDiv>
            {enrollments?.length ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    // background: colors.gray[600],
                    color: colors.gray[100],
                    textAlign: "end",
                    padding: "2px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  <InsightsIcon />
                </div>
                <PieChart isDashboard={true} />
                <div
                  style={{
                    // background: colors.gray[700],
                    color: colors.greenAccent[500],
                    textAlign: "center",
                    padding: "2px",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                    fontSize: "12px",
                  }}
                >
                  variation of the progress
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${colors.greenAccent[500]}`,
                  color: colors.greenAccent[500],
                  letterSpacing: "1px",
                }}
              >
                No enrollments for this year yet.
              </div>
            )}
          </ChartDiv>
        </OneGraphContainer>
        <OneGraphContainer
          style={{
            position: "relative",
            overflow: "auto",
            justifyContent: "flex-start",
          }}
          backcolor={colors.primary[400]}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              position: "sticky",
              top: 0,
              left: 0,
              zIndex: 10,
              padding: "10px 0",
              marginBottom: "20px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              backgroundColor: colors.gray[700],
              color: colors.gray[100],
              fontWeight: 500,
            }}
          >
            available events
          </div>
          <List sx={{ width: "90%", zIndex: 5 }}>
            {currentEvents.length ? (
              currentEvents?.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    color: colors.primary[500],
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      // background: "red",
                      overflow: "auto",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.date, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </div>
                  <div
                    style={{
                      width: "20%",
                      height: "50px",
                      // background: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EventAvailableIcon
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </div>
                </ListItem>
              ))
            ) : (
              <div
                style={{
                  // background: "red",
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${colors.greenAccent[500]}`,
                  color: "#4cceac",
                }}
              >
                No events yet
              </div>
            )}
          </List>
        </OneGraphContainer>
      </GraphsContainer>
    </DashboardMain>
  );
};

export default Dashboard;
