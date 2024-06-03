import { ReactElement } from "react";
import * as Styled from "./styles"

import { ITransaction } from "@/interfaces/ITransaction";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "src/components/ui/hover-card"
  

interface GridTransactionsProps {
    data: ITransaction[] | undefined
}

export default function GridTransactions({ data }: GridTransactionsProps): ReactElement {
    
    function substractDay(date: Date | string, days: number): string {
        const newDate = typeof date === "object" ? date : new Date(date);
        newDate.setDate(newDate.getDate() - days);
        
        return newDate.toISOString()
    }

    function transactionsInDate(list: ITransaction[], date: string) {
        return list.filter(item => item.date.split("T")[0] === date.split("T")[0])
    }

    function calculateFinalBalance(transactions: ITransaction[]): number | undefined {
        let balance = 0
      
        for (const transaction of transactions) {
          if (transaction.type === "Depósito") {
            balance += Number(transaction.value)
          } else if (transaction.type === "Transferência") {
            balance -= Number(transaction.value)
          }
        }

        if (transactions.length === 0) {
            return undefined
        } else {
            return balance
        }
      }
      
    
    return (
        <Styled.Container>
            { data !== undefined ?
                Array.from({ length: 90 }).map((_, key) => {
                    // const transactionDate = data[key]?.date
                    const date = substractDay(new Date(), Math.abs(key - 89))
                    const finalBalance = calculateFinalBalance(transactionsInDate(data, date))
                    
                    return (
                        finalBalance === undefined ?
                            <Styled.Square balance={finalBalance}></Styled.Square>
                            :
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Styled.Square balance={finalBalance}></Styled.Square>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h3> Saldo final do dia </h3>
                                    { finalBalance ?? "Nenhuma transação foi feita nesse dia" }
                                </HoverCardContent>
                            </HoverCard>
                    ) 
                })
                :
                <p> Carregando... </p>
            }
        </Styled.Container>
    )
}