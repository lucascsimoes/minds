import { ReactElement } from "react";
import * as Styled from './styles'

import { ISpinner } from "@/interfaces/ISpinner";

export default function Spinner({ size = 40, color = '#fff', stroke = 4 }: ISpinner): ReactElement {
    
    return <Styled.Container size={size} color={color} stroke={stroke} />
}