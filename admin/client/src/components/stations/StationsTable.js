import styled from "styled-components";
import TableRow from "./TableRow";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StyledTable = styled.table`
  width: 100%;
  height: 300px;
  border-collapse: collapse;
`;

const TH = styled.th`
  border: 1px solid ${(props) => (props.modes === "dark" ? "#fff" : "#000")};
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const CAPTION = styled.caption`
  border: 1px solid ${(props) => (props.modes === "dark" ? "#fff" : "#000")};
  padding: 10px;
  font-size: 20px;
  letter-spacing: 1px;
`;

const StationsTable = ({ stats }) => {
  const theme = useTheme();
  const colormode = theme.palette.mode;
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {stats.length ? (
        <StyledTable>
          <CAPTION modes={colormode}>STATIONS STATS</CAPTION>
          <thead>
            <tr>
              <TH modes={colormode} scope="col">
                ID
              </TH>
              <TH modes={colormode} scope="col">
                NAME
              </TH>
              <TH modes={colormode} scope="col">
                Available Bicycles
              </TH>
              <TH modes={colormode} scope="col">
                Location
              </TH>
            </tr>
          </thead>
          <tbody>
            {stats?.map((station) => (
              <TableRow
                key={station._id}
                modes={colormode}
                id={station._id}
                name={station.stationName}
                bikes={station.bikesAvailable}
                location={station.location}
              />
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "1px",
            width: "100%",
            height: "100%",
            background: colors.primary[400],
            color: colors.greenAccent[500],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No stations Available Yet
        </div>
      )}
    </>
  );
};

export default StationsTable;
