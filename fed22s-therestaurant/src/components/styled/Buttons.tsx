import { styled } from "styled-components";
import { devices } from "./devices";

interface IButtonProps {
  disabled: boolean;
}
export const Button = styled.button`
  font-family: "Julius Sans One", sans-serif;
  font-size: 20px;
  color: ${({ disabled }) => (disabled ? "#C1B9B9" : "white")};
  border: 1px solid rgba(50, 50, 93, 0.25);
  background-color: ${({ disabled }) => (disabled ? "#818C9D" : "#818C9D")};
  height: 50px;
  min-width: 100px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;

  &:hover {
    border: 1px solid #accdff;
  }

  &:active {
    transition: none;
    border: ${({ disabled }) =>
      disabled ? "1px solid #818C9D" : "1px solid #59739A"};
    background-color: ${({ disabled }) => (disabled ? "#818C9D" : "#4B5F7B")};
    color: ${({ disabled }) => (disabled ? "#C1B9B9" : "#ACCDFF")};
  }
`;

export const ChangeButton = styled(Button)`
  font-size: 11pt;
  padding: 5px;
  height: 40px;
  min-width: 50px;
  margin: 5px;
  background-color: #0e192bde;

  @media screen and (${devices.tablet}) {
    width: 130px;
    font-size: 13pt;
    padding: 25px;
  }
`;

export const SittingsButton = styled(Button)<IButtonProps>`
  background-color: ${({ disabled }) => (disabled ? "#242d3ade" : "#0e192bde")};
  color: ${({ disabled }) => (disabled ? "#9c9a9a" : "white")};
`;

export const BackButton = styled(Button)`
  margin: 20px;
  margin-top: 70px;

  @media screen and (${devices.tablet}) {
    margin: 15px;
    margin-top: 35px;
  }
`;
