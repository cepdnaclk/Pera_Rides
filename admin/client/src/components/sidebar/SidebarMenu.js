import styled from "styled-components";
import { IconButton, useTheme } from "@mui/material";
import {
  HomeOutlined,
  PeopleOutlined,
  PersonOutlined,
  PieChartOutlined,
  BarChartOutlined,
  // MenuOutlined,
  CalendarTodayOutlined,
  Paid,
  AccountBalance,
  DirectionsBike,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import IM from "../../assests/ff.jpg";
import { useDispatch } from "react-redux";
import { setComponent } from "../../Redux/features/comp_inside_homepage/componentSlice";
// import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

/* STYLED COMPONENTS */
const SidebarMainDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

const SideBArImageContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SideBarImageWrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 110px;
  height: 110px;
  margin-bottom: 10px;
  border-radius: 50%;
`;

const SideBarImageText = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${(props) => (props.font === "small" ? "10px" : "15px")};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SidebarHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
`;

const HeaderWordContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 20px;
  text-transform: capitalize;
  letter-spacing: 1px;
  border-radius: 10px 0 0 0;
`;
const HeaderIconContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  border-radius: 0px 10px 0 0;
`;

const StyledMenuIcon = styled(DirectionsBike)`
  width: 30px;
  height: 30px;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  &:hover {
    color: #4cceac;
  }
`;

const MenuItemIcon = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
`;

const MenuItemWord = styled.div`
  flex: 2;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const SidebarMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  return (
    <SidebarMainDiv color={colors.primary[400]}>
      <SidebarHeader>
        <HeaderWordContainer>admin</HeaderWordContainer>
        <HeaderIconContainer>
          {/* <IconButton> */}
          <StyledMenuIcon />
          {/* </IconButton> */}
        </HeaderIconContainer>
      </SidebarHeader>
      <SideBArImageContainer>
        <SideBarImageWrapper>
          <Img src={IM} alt="" />
        </SideBarImageWrapper>
        <SideBarImageText font="big">pera ride</SideBarImageText>
        <SideBarImageText font="small">cycle beyond limits</SideBarImageText>
      </SideBArImageContainer>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("dashboard"))}>
            <HomeOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Dashboard</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("manageUsers"))}>
            <PeopleOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Manage Users</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("addUser"))}>
            <PersonOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Add User</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("calender"))}>
            <CalendarTodayOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Calender</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("pay"))}>
            <Paid />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>User Payments</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("barChart"))}>
            <BarChartOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Revenue</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("pieChar"))}>
            <PieChartOutlined />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Enrollment</MenuItemWord>
      </MenuItem>
      <MenuItem>
        <MenuItemIcon>
          <IconButton onClick={() => dispatch(setComponent("stations"))}>
            <AccountBalance />
          </IconButton>
        </MenuItemIcon>
        <MenuItemWord>Stations</MenuItemWord>
      </MenuItem>
    </SidebarMainDiv>
  );
};

export default SidebarMenu;
