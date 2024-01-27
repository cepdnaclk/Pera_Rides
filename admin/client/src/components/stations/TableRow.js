import styled from "styled-components";

const TD = styled.th`
  border: 1px solid ${(props) => (props.modes === "dark" ? "#fff" : "#000")};
  padding: 10px;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 400;
`;

const TableRow = ({ id, name, bikes, modes }) => {
  return (
    <tr>
      <TD modes={modes}>{id}</TD>
      <TD modes={modes}>{name}</TD>
      <TD modes={modes}>{bikes}</TD>
    </tr>
  );
};

export default TableRow;
