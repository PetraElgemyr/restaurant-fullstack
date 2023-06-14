import { H2 } from "./styled/Headings"
import { LoaderContainer, Spinner } from "./styled/Loadings"
import { Span } from "./styled/Span"

export const Loader = () => {
    return (
        <LoaderContainer>
            <Spinner>
                <svg xmlns="http://www.w3.org/2000/svg"  id="rotatingText" viewBox="0 0 200 200" width="400" height="400">
                    <defs>
                        <path id="circle" d="M 100, 100
                            m -75, 0
                            a 75, 75 0 1, 0 150, 0
                            a 75, 75 0 1, 0 -150, 0
                        ">
                        </path>
                    </defs>
                    <text width="800" className="curved-text">           
                        <textPath alignment-baseline="left" href="#circle">BakgårdenBakgården</textPath>
                    </text>
                </svg>  
            </Spinner>
        </LoaderContainer>

    )
}