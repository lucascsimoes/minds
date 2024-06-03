import { ReactElement } from "react";
import * as Styled from './styles'

import dayjs from "dayjs";
import 'dayjs/locale/pt-br'

import Balance from "../Balance";
import getFromToken from "src/services/getFromToken";

export default function Introduction(): ReactElement {

    let now = dayjs().locale('pt-br').format('dddd, DD/MM/YYYY')
    now = now[0].toUpperCase() + now.slice(1)

    return (
        <Styled.Container>
            <main>
                <h1> Olá, Lucas </h1>
                <p> { now } </p>

                <Balance/>
            </main>
            <img draggable={false} alt="" src="./background-pattern.svg"/>
        </Styled.Container>
    )
}