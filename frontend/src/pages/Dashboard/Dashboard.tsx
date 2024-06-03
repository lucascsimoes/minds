import { ReactElement } from "react";
import * as Styled from "./styles"

import GridTransactions from "src/components/GridTransactions/GridTransactions";
import { useQuery } from "@tanstack/react-query";
import { ITransaction } from "@/interfaces/ITransaction";

export default function Dashboard(): ReactElement {

    const { data: transactions } = useQuery<ITransaction[]>({  queryKey: ['transactions'] })

    return (
        <Styled.Container>
            <section>
                <h3> Últimas transações </h3>

                <GridTransactions data={transactions}/>
            </section>
        </Styled.Container>
    )
}