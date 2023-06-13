import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const Input = styled.input`
    font-family: 'Kite One', sans-serif;
    font-size: 20px;
    color: white;
    border: 1px solid rgba(0, 0, 0, 0.30);
    background-color: #4B5F7B;
    height: 40px;
    min-width: 100px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition-property: border background-color;
    transition-duration: 0.5s;
    border-radius: 4px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.30) 0px 2px 4px 0px inset;
      
    :-webkit-outer-spin-button,
    :-webkit-inner-spin-button 
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;

    &:focus {
        border: 1px solid #ACCDFF;
        outline: white;
        background-color: #7C95BB;
        &::placeholder {
            opacity: 0;
        }
    }
`