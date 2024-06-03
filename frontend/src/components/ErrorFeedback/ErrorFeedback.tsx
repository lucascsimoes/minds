import { ReactElement, ReactNode } from "react";
import * as Styled from './styles'

export default function ErrorFeedback({ children }: { children: ReactNode }): ReactElement {
    return (
        <Styled.Container>
            <h2> Ooops... </h2>
            <p> { children } </p>
        </Styled.Container>
    )
}