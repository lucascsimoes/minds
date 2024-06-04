import { ReactElement } from "react";
import * as Styled from './styles'

import { ITransaction } from "../../interfaces/ITransaction";

import dayjs from "dayjs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger, } from "src/components/ui/accordion"

export default function ExtractItem({ _id, type, description, value, date }: Omit<ITransaction, 'userId'>): ReactElement {
    
    const formatDate = dayjs(date).format('DD/MM/YYYY')

    return (
        <AccordionItem value={"item" + _id}>
            <AccordionTrigger>
                <Styled.Container>
                    <p> { type } &#9679; { formatDate } </p>
                    <div>
                        { type === "Depósito" ? <TrendingUp color="#059669"/> : <TrendingDown color="#dc2626"/> }
                        <p> R$ { value.toFixed(2) } </p>
                    </div>
                </Styled.Container>
            </AccordionTrigger>
            <AccordionContent>
                <Styled.Content>
                    <h5> Descrição </h5>
                    <p> { description === 'null' ? "Nenhuma descrição fornecida" : description } </p>
                </Styled.Content>
            </AccordionContent>
        </AccordionItem>
    )
}