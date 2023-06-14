import { styled } from "styled-components";
import { devices } from "./devices";

export const StyledParagraph = styled.p`
  font-size: 10pt;
  font-style: italic;
  margin: 5px;

  @media screen and (${devices.tablet}) {
    font-size: 12pt;
  }
`;

export const StyledSpan = styled.span`
  font-size: 11pt;
  margin: 0;

  @media screen and (${devices.tablet}) {
    font-size: 13pt;
    margin: 5px;
  }
`;

export const GdprSpan = styled(StyledSpan)`
  padding: 20px;
  margin-bottom: 35px;
`;

export const LableText = styled.span`
  padding: 10px;
`;

export const FormBookingParagraph = styled.p`
  font-family: "Kite One", sans-serif;
`;
