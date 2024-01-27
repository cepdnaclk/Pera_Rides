import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import apiConnection from "../../apiConnection";

const Barchart = ({ isInDashboard }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBarData = async () => {
      try {
        const response = await apiConnection.get("/income/status");
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBarData();
  }, []);

  const getColor = (bar) => {
    const gainedIncome = bar.data.income;

    const color =
      gainedIncome > 5000
        ? theme.palette.mode === "dark"
          ? "hsl(200, 80%, 50%)"
          : "hsl(200, 80%, 20%)"
        : gainedIncome > 4000
        ? theme.palette.mode === "dark"
          ? "hsl(15, 70%, 65%)"
          : "hsl(270, 60%, 40%)"
        : gainedIncome > 3000
        ? theme.palette.mode === "dark"
          ? "hsl(120, 80%, 60%)"
          : "hsl(210, 80%, 40%)"
        : gainedIncome > 2000
        ? theme.palette.mode === "dark"
          ? "hsl(45, 80%, 70%)"
          : "hsl(180, 50%, 50%)"
        : gainedIncome > 1000
        ? theme.palette.mode === "dark"
          ? "hsl(50, 75%, 55%) "
          : "hsl(0, 70%, 50%)"
        : gainedIncome > 500
        ? theme.palette.mode === "dark"
          ? "hsl(40, 80%, 50%)"
          : "hsl(90, 60%, 30%)"
        : theme.palette.mode === "dark"
        ? "hsl(150, 75%, 60%)"
        : "hsl(30, 70%, 30%)";
    return color; // You can set a default color for other bars
  };

  return (
    <ResponsiveBar
      width={900}
      height={500}
      data={data || []}
      keys={["income"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColor}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isInDashboard ? undefined : "month",
        legendPosition: "middle",
        legendOffset: 40,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isInDashboard ? undefined : "Sri Lankan Rupees",
        legendPosition: "middle",
        legendOffset: -50,
        truncateTickAt: 0,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="monthly revenue"
      barAriaLabel={(e) => e.id + " : revenue in month: " + e.month}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500], // Set your desired color here
          },
        },
      }}
    />
  );
};

export default Barchart;
