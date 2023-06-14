import styled from "styled-components";


export const LoaderContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #1f242c;
`

export const Spinner = styled.div`
    height: 300px;
    width: 300px;

    display: flex;
    border-radius: 100%;
    justify-content: center;
    align-items: center;

    transform: rotate(360deg) infinte;

    animation-name: spin;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 

    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
`