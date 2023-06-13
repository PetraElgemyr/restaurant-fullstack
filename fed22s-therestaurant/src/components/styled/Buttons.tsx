import { styled } from "styled-components";
import { devices } from "./devices";

interface IButtonProps {
    disabled: boolean;
}
export const Button = styled.button`
    font-family: 'Julius Sans One', sans-serif;
    font-size: 20px;
    color: ${({disabled}) => disabled ? "#C1B9B9" : "white"};
    border: 1px solid rgba(50, 50, 93, 0.25);
    background-color: ${({disabled}) => disabled ? "#818C9D" : "#818C9D"};
    height: 50px;
    min-width: 100px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 4px;
    padding: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;

    &:hover {
        border: 1px solid #ACCDFF;    
    }

    &:active {
        transition: none;
        border: ${({disabled}) => disabled ? "1px solid #818C9D" : "1px solid #59739A"}; ;
        background-color: ${({disabled}) => disabled ? "#818C9D" : "#4B5F7B"};
        color: ${({disabled}) => disabled ? "#C1B9B9" : "#ACCDFF"};
    }
`