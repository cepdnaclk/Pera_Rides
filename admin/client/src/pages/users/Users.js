import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const MainUsersGrid = styled.div`
  width: 100%;
  height: 100%;
`;

const BtnsContainer = styled.div``;
const Button = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 3px;
  border: none;
  outline: none;
`;

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
    },
    {
      field: "manage",
      headerName: "Delete",
      renderCell: () => {
        return (
          <BtnsContainer>
            <Button color={theme.palette.mode === "dark" ? "red" : "teal"}>
              <DeleteOutlineOutlinedIcon />
            </Button>
          </BtnsContainer>
        );
      },
    },
  ];

  return (
    <MainUsersGrid>
      <HeaderTitle title="USERS" subtitle="Managing the Team Members" />
      <Box
        m="0px 0 0 0"
        height="75vh"
        width="90%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataUsers} columns={columns} />
      </Box>
    </MainUsersGrid>
  );
};

export default Users;
