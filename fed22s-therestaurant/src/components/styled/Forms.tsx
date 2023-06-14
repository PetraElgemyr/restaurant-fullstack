import styled from "styled-components";
import { devices } from "./devices";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (${devices.desktop}) {
    gap: 30px;
  }
`;

export const Input = styled.input`
  font-family: "Kite One", sans-serif;
  font-size: 20px;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: #4b5f7b;
  height: 30px;
  min-width: 100px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition-property: border background-color;
  transition-duration: 0.5s;
  border-radius: 4px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px inset;

  :-webkit-outer-spin-button,
    :-webkit-inner-spin-button 
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;

  &:focus {
    border: 1px solid #accdff;
    outline: white;
    background-color: #7c95bb;
    &::placeholder {
      opacity: 0;
    }
  }

  @media screen and (${devices.desktop}) {
    height: 45px;
  }
`;

// export const CheckboxInput = styled(Input)`
//   border: 0;
//   background-color: unset;
//   width: 30px;
//   height: 30px;
//   box-shadow: none;
// `;

export const InputCheckbox = styled.input`
  border: 1px solid white;
  position: absolute;
  text-align: center;
`;
