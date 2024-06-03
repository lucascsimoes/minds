import { ReactElement, useState } from "react";
import * as Styled from './styles'

import ExtractItem from "../ExtractItem";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import { ITransaction } from "../../interfaces/ITransaction";
import TransactionServices from "src/services/transactions";

import { Layers, TrendingDown, TrendingUp } from "lucide-react";
import { Accordion } from "src/components/ui/accordion"
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function Extract(): ReactElement {

    const { data: transactions, isLoading, error } = useQuery<ITransaction[]>({ 
        queryKey: ['transactions'],
        queryFn: () => TransactionServices.get(),
        enabled:  false
    })

    const trasactionsTypesToFilter: string[] = ["Todos", "Depósito", "Transferência"]
    const [filter, setFilter] = useState(trasactionsTypesToFilter[0])

    if (isLoading) return <Spinner/>
    if (error) return <ErrorFeedback> { error.message } </ErrorFeedback>
    if (!transactions?.length) return (
        <>
            <p> Você não fez nenhuma transação nos últimos 90 dias. Deseja alterar o tempo de visualização? </p>
            <Link to={"/config"}> Alterar configuração </Link>
        </>
    )

    function getTransactionTypeIcon(type: string): ReactElement {
        switch (type) {
            case "Depósito": 
                return <TrendingUp size={18} />
            case "Transferência": 
                return <TrendingDown size={18} /> 
            default:
                return <Layers size={18} />
        }
    }

    

    return (
        <Styled.Container>
            <div>
                { trasactionsTypesToFilter.map((item) => {
                    return (
                        <Styled.FilterButton 
                            key={item}
                            $active={filter === item}
                            onClick={() => setFilter(item)}
                        >
                            { getTransactionTypeIcon(item) } 
                        </Styled.FilterButton>
                    )
                }) }
            </div>
            
            <ScrollArea className="h-[640px]">
                <Accordion type="single" collapsible>
                    { transactions?.filter(transaction => filter === "Todos" ? transaction : transaction.type === filter).map((transaction: ITransaction) => (
                        <ExtractItem
                            key={transaction.id}
                            id={transaction.id}
                            type={transaction.type}
                            description={transaction.description}
                            value={transaction.value}
                            date={transaction.date}
                        />
                    )) }
                </Accordion>
            </ScrollArea>
        </Styled.Container>
    )
}