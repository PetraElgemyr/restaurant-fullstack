import styled from "styled-components";
import { devices } from "./devices";

interface IGuestBoxProps {
  selected: boolean;
}

export const GuestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  gap: 20px;
  font-family: "Julius Sans One", sans-serif;
  color: white;
`;

export const GuestBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: #48505db5;
  padding: 10px;
  border: 1px solid white;

  @media screen and (${devices.desktop}) {
    width: 60%;
    padding: 15px;
  }
`;

export const GuestBox = styled.span<IGuestBoxProps>`
  width: 15%;
  margin: 5px;
  padding: 10px;
  text-align: center;
  border: 1px solid white;
  background-color: ${({ selected }) => (selected ? "#111b2ab5" : "#818C9D")};

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px #000000b5;
  }

  @media screen and (${devices.desktop}) {
    width: 8%;
    margin: 10px;
    padding: 15px;
  }
`;
