import { ReactElement, useState } from "react";
import * as Styled from "./styles"

import { ICard } from "@/interfaces/ICard";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "../ui/carousel";

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface CardsCarouselProps  {
    data: ICard[] | undefined
    cardSelected: (value: ICard) => void
}

export default function CardsCarousel({ data, cardSelected }: CardsCarouselProps): ReactElement {

    const [selected, setSelected] = useState<number>(1)
    const symbols = Array.from({ length: 4 }).map((_, index) => (
        <span key={index}>&#x25CF;</span>
    ));

    function handleCardDisplay(card: ICard) {
        setSelected(card.id)
        cardSelected(card)
    }

    return (
        <Styled.Container>
            <Carousel
                opts={{ align: "start", }}
                className="pl-[70px] w-full"
            >
                <Styled.CreateCard to={"/cards/add"}>
                    <Plus/>
                </Styled.CreateCard>
                <CarouselContent className="w-full">
                    { data?.map(card => (
                        <CarouselItem key={card.id} className="basis-1/3 h-[60px]">
                            <Styled.Item 
                                to={"/cards"}
                                $active={selected === card.id} 
                                onClick={() => handleCardDisplay(card)} 
                            >
                            <header> 
                                { Array.from({ length: 3 }).map((_, key) => <p key={key}> { symbols } </p>) }   
                                <span> { card.number.slice(-4) } </span>
                            </header>  
                            </Styled.Item>
                        </CarouselItem>
                    )) }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </Styled.Container>
    )
}