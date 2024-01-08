import styled from "styled-components";
import HeaderTitle from "../headerTitle/HeaderTitle";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import LineChart from "../linechart/LineChart";
// import BarChart from "../barchart/Barchart";
// import StatBox from "../StatBox/StatBox";
// import ProgressCircle from "../progressCircle/ProgressCircle";

const DashboardMain = styled.div`
  width: 100%;
  height: 100%;
`;

const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  return (
    <DashboardMain>
      <HeaderTitle title={"Dashboard"} desc="welcome to your dashboard" />
    </DashboardMain>
  );
};

export default Dashboard;
