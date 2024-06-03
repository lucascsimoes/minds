import { ReactElement, useState } from "react";
import * as Styled from './styles'

import { ICard } from "@/interfaces/ICard"

import "react-credit-cards-2/dist/es/styles-compiled.css";
import CardInterface from 'react-credit-cards-2';
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Card({ id, number, date, name, cvv }: ICard): ReactElement {

    const [focus, setFocus] = useState<"number" | "cvc">("number")
    const handleFocus = () =>  {
        const newFocus = focus === "number" ? "cvc" : "number"
        setFocus(newFocus)
    }

    return (
        <Styled.Container>
            <main>
                <button onClick={handleFocus}> <ChevronUp/> </button>
                <CardInterface
                    number={number}
                    expiry={date}
                    cvc={cvv}
                    name={name}
                    focused={focus}
                />
                <button onClick={handleFocus}> <ChevronDown/> </button>
            </main>
            
        </Styled.Container>
    )
}