import { styled } from "styled-components";
import { devices } from "./devices";
import plateFiggs from "../assets/plate-figgs.jpg";

interface IContainerProps {
    flexdirection?: string;
} 

interface IImageContainerProps {
    img?: string;
}

export const Container = styled.div<IContainerProps>`
    display: flex;
    flex-direction: ${(props: IContainerProps) => props.flexdirection || "column"};
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 6px;
    min-width: 50vw;
    max-width: 80vw;
`

export const ImageContainer = styled.div<IImageContainerProps> `
    display: none;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 100vh;

    @media screen and (${devices.desktop}) {
        display: flex;
        background-image: url(${(props: IImageContainerProps) => props.img || ""});
        background-position: center;
        background-size: cover;
    }

`