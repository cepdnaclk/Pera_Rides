import styled from "styled-components";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const HeaderTitleMain = styled.div`
  width: 100%;
  height: 60px;
  /* background-color: ${(props) => props.color}; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 30px 10px 10px;
`;

const HeadetTitleText = styled.p`
  font-size: ${(props) => (props.size === "big" ? "20px" : "12px")};
  color: ${(props) => props.color};
  letter-spacing: 1px;
  text-transform: ${(props) =>
    props.size === "big" ? "uppercase" : "lowercase"};
`;

const HeaderTitle = ({ title, desc }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <HeaderTitleMain color={colors.primary[500]}>
      <HeadetTitleText color={colors.gray[100]} size="big">
        {title}
      </HeadetTitleText>
      <HeadetTitleText color={colors.greenAccent[400]} size="small">
        {desc}
      </HeadetTitleText>
    </HeaderTitleMain>
  );
};

export default HeaderTitle;
