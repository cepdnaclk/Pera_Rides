// import HeaderTitle from "../headerTitle/HeaderTitle";
// import { useTheme } from "@mui/material";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import StatBox from "../StatBox/StatBox";
// import ProgressCircle from "../progressCircle/ProgressCircle";
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

const DashboardMain = styled.div`
  width: 97%;
  height: 85%;
  margin-top: 20px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
`;

const StatsContainer = styled.div`
  /* background-color: blue; */
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
  /* background-color: lime; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LeftAmountContainer = styled.div`
  width: 100%;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 15px;
  letter-spacing: 1px;
`;
const LeftTitleContainer = styled.div`
  width: 100%;
  /* background-color: purple; */
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 10px;
  letter-spacing: 1px;
`;

const OneStatRight = styled.div`
  flex: 1;
  /* background-color: cornflowerblue; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightIconContainer = styled.div`
  width: 100%;
  height: 40%;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-size: 400px; */
  /* padding-left: 20px; */
`;

const GraphsContainer = styled.div`
  /* background-color: purple; */
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
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 30px 30px 30px 10px; */
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
  const [currentEvents, setCurrentEvents] = useState([]);

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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <DashboardMain>
      <StatsContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>500</LeftAmountContainer>
            <LeftTitleContainer>total users</LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <PeopleAltIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>5000.00</LeftAmountContainer>
            <LeftTitleContainer>total income</LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <LocalAtmIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>10</LeftAmountContainer>
            <LeftTitleContainer>total stations</LeftTitleContainer>
          </OneStatLeft>
          <OneStatRight>
            <RightIconContainer>
              <LocalParkingIcon sx={{ width: "40px", height: "40px" }} />
            </RightIconContainer>
          </OneStatRight>
        </OneStatContainer>
        <OneStatContainer backcolor={colors.primary[400]}>
          <OneStatLeft>
            <LeftAmountContainer>50</LeftAmountContainer>
            <LeftTitleContainer>total bicycles</LeftTitleContainer>
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
            <BarChart isDashboard={true} />
          </ChartDiv>
        </OneGraphContainer>
        <OneGraphContainer backcolor={colors.primary[400]}>
          <ChartDiv>
            <PieChart isDashboard={true} />
          </ChartDiv>
        </OneGraphContainer>
        <OneGraphContainer
          style={{ position: "relative", overflow: "auto" }}
          backcolor={colors.primary[400]}
        >
          <div
            style={{
              // background: "red",
              width: "100%",
              textAlign: "center",
              position: "sticky",
              top: 0,
              left: 0,
              zIndex: 10,
              padding: "10px",
              marginBottom: "20px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              backgroundColor: colors.primary[400],
            }}
          >
            available events
          </div>
          <List sx={{ width: "90%", zIndex: 5, margin: "10px 0" }}>
            {currentEvents?.map((event) => (
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
                        <Typography>
                          {formatDate(event.date, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
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
                  <EventAvailableIcon sx={{ width: "30px", height: "30px" }} />
                </div>
              </ListItem>
            ))}
          </List>
        </OneGraphContainer>
      </GraphsContainer>
    </DashboardMain>
  );
};

export default Dashboard;
