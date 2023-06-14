import styled from "styled-components";
import { devices } from "./devices";

export const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
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
  justify-content: flex-start;

  @media screen and (${devices.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    width: 100%;
  }
`;

export const InputWrapperRow = styled(WrapperRow)`
  background-color: unset;
  width: 80%;
  border: 0;
  justify-content: center;
  gap: 10px;

  @media screen and (${devices.tablet}) {
    width: 65%;
  }

  @media screen and (${devices.desktop}) {
    width: 45%;
  }
`;

export const AdminTextWrapper = styled(WrapperColumn)`
  border: 1px solid white;
  margin: 10px;
  padding-bottom: 10px;
`;

export const AdminChangeWrapper = styled(WrapperColumn)`
  justify-content: center;

  @media screen and (${devices.tablet}) {
    width: 50%;
    margin: 0;
  }
`;

export const TopMarginWrapper = styled(WrapperColumn)`
  padding-top: 20%;

  @media screen and (${devices.tablet}) {
    padding-top: 11%;
  }

  @media screen and (${devices.desktop}) {
    padding-top: 7%;
  }
`;

export const BottomMarginWrapper = styled(WrapperColumn)`
  padding-bottom: 40px;
`;

export const AdminCalendarChange = styled(WrapperColumn)`
  background-color: #818c9d;
  width: 100%;
  padding: 10px;
  border: 1px solid white;

  @media screen and (${devices.tablet}) {
    width: 80%;
  }
`;
