import { ReactElement } from "react";
import * as Styled from './styles'

import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import { useQuery } from "@tanstack/react-query";

import Balance from "../Balance";
import userInfos from "src/services/userInfos";
import { IUser } from "@/interfaces/IUser";


export default function Introduction(): ReactElement {

    const { data: userData, isLoading, error } = useQuery<Pick<IUser, 'name' | 'balance'>>({ 
        queryKey: ['user'],
        queryFn: () => userInfos.get()
    })

    let now = dayjs().locale('pt-br').format('dddd, DD/MM/YYYY')
    now = now[0].toUpperCase() + now.slice(1)

    if (error) {
        throw new Error("Não é possível acessar o Minds nesse momento. Pedimos desculpas pelo transtorno")
    }

    if (isLoading || userData === undefined) {
        return <p> Carregando... </p>
    }

    return (
        <Styled.Container>
            <main>
                <h1> Olá, { userData.name } </h1>
                <p> { now } </p>

                <Balance balance={userData.balance}/>
            </main>
            <img draggable={false} alt="" src="./background-pattern.svg"/>
        </Styled.Container>
    )
}