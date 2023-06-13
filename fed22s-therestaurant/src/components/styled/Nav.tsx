import { styled } from "styled-components";
interface IToggled {
    toggled: number;
}

export const Nav = styled.div`
    display: flex;
    flex-direction: row;
`

export const Logo = styled.h3`
    font-family: 'Lobster Two', cursive;
    font-size: 2em;
    padding: 0.2em;
    margin: 0;
`

export const Menu = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    top: 10px;
    right: 13px;   
`

export const DropDownMenu = styled.div<IToggled>`
    font-family: 'Julius Sans One', sans-serif;
    display: flex;
    transition: top 1s;
    top: ${({toggled}) => toggled ? "0" : "-150px" };
    flex-direction: column;
    background-color: #818C9D;
    position: absolute;
    width: 100vw;
    height: 150px;
    justify-content: center;
    align-items: center;


    & > ul {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 0;
        margin: 0;

        & > li {
            display: flex;
            justify-content: center;
            border-bottom: solid transparent 1px;
            transition: all 0.6s;
            &:hover {
                border-bottom: solid white 1px;
            }
        }
    }
`

export const HamMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    padding: 0px;  
`

export const HamStick = styled.div<IToggled>`
    position: absolute;
    width: 30px;
    height: 3px;
    border-radius: 1rem;
    background-color: ${({toggled}) => toggled ? "transparent" : "white" };
    transition: background 0.4s, font-size 0s;
    &::before,
    &::after {
      transition: font-size 0s;
      transform-origin: center center;
    }

    &:before,
    &:after {
        transition: font-size 0s;
        content: "";
        display: block;
        position: absolute;
        width: 30px;
        height: 3px;
        background: white;
        border-radius: 1rem;
    }
    &:before {
        margin-top: -0.9em;
        animation: ${({toggled}) => toggled ? "burg2top 0.4s linear forwards" : "burg2topReset 0.4s linear forwards"};
    }
    &:after {
        margin-top: 0.9em;
        animation: ${({toggled}) => toggled ? "burg2bottom 0.4s linear forwards;" : "burg2bottomReset 0.4s linear forwards"};
    }

    @keyframes burg2top {
        0% {
        }
        20% {
          margin-top: 0em;
          transform: rotate(0deg);
        }
        60% {
          margin-top: 0em;
          transform: rotate(55deg);
        }
        100% {
          margin-top: 0em;
          transform: rotate(45deg);
        }
      }
    
      @keyframes burg2bottom {
        0% {
        }
        20% {
          margin-top: 0em;
          transform: rotate(0deg);
        }
        60% {
          margin-top: 0em;
          transform: rotate(-55deg);
        }
        100% {
          margin-top: 0em;
          transform: rotate(-45deg);
        }
      }
    
      @keyframes burg2topReset {
        0% {
          margin-top: 0em;
          transform: rotate(45deg);
        }
        20% {
          transform: rotate(0deg);
        }
        60% {
          margin-top: 0.9em;
          transform: rotate(0deg);
        }
        100% {
          margin-top: 0.9em;
          transform: rotate(0deg);
        }
      }
    
      @keyframes burg2bottomReset {
        0% {
          margin-top: 0em;
          transform: rotate(-45deg);
        }
        20% {
          transform: rotate(0deg);
        }
        60% {
          margin-top: -0.9em;
          transform: rotate(0deg);
        }
        100% {
          margin-top: -0.9em;
          transform: rotate(0deg);
        }
      }
`