import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataUsers } from "../../data/mockData";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector } from "react-redux";
import { useState } from "react";
const MainUsersGrid = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px;
`;

const BtnsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
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

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 3px;
  }
`;

const StyledHeader = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-left: ${(props) => props.padding};
`;

const Users = () => {
  const { allUsers } = useSelector((store) => store.users);

  const [userData, setUserData] = useState(allUsers);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      renderCell: (params) => {
        return (
          <StyledDiv>
            <span> {params.value} </span>
          </StyledDiv>
        );
      },
      renderHeader: () => {
        return <StyledHeader padding="100px">ID</StyledHeader>;
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <StyledDiv>
            <span> {params.value} </span>
          </StyledDiv>
        );
      },
      renderHeader: () => {
        return <StyledHeader padding="30px">Username</StyledHeader>;
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return (
          <StyledDiv>
            <span> {params.value} </span>
          </StyledDiv>
        );
      },
      renderHeader: () => {
        return <StyledHeader padding="40px">Phone</StyledHeader>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => {
        return (
          <StyledDiv>
            <span> {params.value} </span>
          </StyledDiv>
        );
      },
      renderHeader: () => {
        return <StyledHeader padding="40px">Phone</StyledHeader>;
      },
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
      renderCell: (params) => {
        return (
          <StyledDiv>
            <span> {params.value} </span>
          </StyledDiv>
        );
      },
      renderHeader: () => {
        return <StyledHeader padding="40px">Balance</StyledHeader>;
      },
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
      renderHeader: () => {
        return <StyledHeader padding="20px">Delete</StyledHeader>;
      },
    },
  ];

  return (
    <MainUsersGrid>
      <HeaderTitle title="USERS" desc="Supervising user management" />
      <Box
        m="20px 0 0 0"
        height="75vh"
        width="95%"
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
            width: "100%",
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
        <DataGrid
          checkboxSelection
          rows={userData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </MainUsersGrid>
  );
};

export default Users;
