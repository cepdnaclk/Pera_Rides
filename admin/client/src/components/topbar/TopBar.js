import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
// import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal } from "../../Redux/features/modal/modalSlice";

const TopbarMainDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  /* background-color: ${(props) => props.color}; */
  /* background-color: green; */
`;

// const SearchContainer = styled.div`
//   display: flex;
//   background-color: ${(props) => props.color};
//   border-radius: 5px;
// `;

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

  return (
    <TopbarMainDiv color={colors.primary[500]}>
      {/* SEARCH BAR */}
      {/* <SearchContainer color={colors.primary[400]}>
        <InputBase sx={{ marginLeft: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ padding: 1 }}>
          <SearchIcon />
        </IconButton>
      </SearchContainer> */}

      {/* OTHER ICONS */}
      <Box display="flex">
        <IconButton
          onClick={colorMode.toggleColorMode}
          title={
            theme.palette.mode === "dark"
              ? "Go to light mode"
              : "Go to dark mode"
          }
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton title="notifications">
          <NotificationsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton title="settings">
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton title="logout" onClick={() => dispatch(openModal())}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </TopbarMainDiv>
  );
};

export default TopBar;
