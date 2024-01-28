import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Piechart = ({ isDashboard }) => {
  const { enrollments } = useSelector((store) => store.userStats);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      width={isDashboard ? 300 : 800}
      height={isDashboard ? 300 : 500}
      data={enrollments}
      margin={{
        top: isDashboard ? 30 : 50,
        right: isDashboard ? 30 : 50,
        bottom: isDashboard ? 30 : 50,
        left: isDashboard ? 50 : 80,
      }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={isDashboard ? false : true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={colors.greenAccent[500]}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      isInteractive={isDashboard ? false : true}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[]}
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
            color: colors.primary[400], // Set your desired color here
          },
        },
      }}
    />
  );
};

export default Piechart;
