import styled from "styled-components";
import { devices } from "./devices";

export const HomeContainer = styled.div`
background-image: url("./src/assets/table-blue-faded.jpg");
background-position: center;
background-size: cover;


    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    width: 100vw;
    min-height: 100vh;
`

export const HomeInfoContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 6px;
    min-width: 50vw;
    max-width: 80vw;
    height: 80vh;

    @media and screen(${devices.desktop}) {
        height: 55vh;
    }
    
`