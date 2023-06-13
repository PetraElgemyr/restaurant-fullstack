import styled from "styled-components";
import { devices } from "./devices";

export const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95vw;
  gap: 10px;
  font-family: "Julius Sans One", sans-serif;
  color: white;
`;

export const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  background-color: #818c9d;
  border: 1px solid white;

  @media screen and (${devices.tablet}) {
    width: 80%;
  }
`;

export const ColToRowWrapper = styled(WrapperColumn)`
  @media screen and (${devices.tablet}) {
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 100%;
  }
`;

export const AdminTextWrapper = styled(WrapperColumn)`
  border: 1px solid white;
  margin: 10px;
`;
export const AdminChangeWrapper = styled(WrapperColumn)`
  justify-content: start;
`;
