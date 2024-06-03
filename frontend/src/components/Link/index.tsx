import { ReactElement } from "react";
import * as Styled from './styles'

interface LinkProps {
    children?: string,
    icon: ReactElement,
    path: string,
    $active: boolean
    onClick?: () => void
}



export default function Link({ children, icon, path, $active, onClick }: LinkProps): ReactElement {

    const Icon = () => icon

    return (
        <Styled.Container onClick={onClick} to={path} $active={$active}>
            <Icon/>
            { children !== undefined && <p> { children } </p> }
        </Styled.Container>
    )
}