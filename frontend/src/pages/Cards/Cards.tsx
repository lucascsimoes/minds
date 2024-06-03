import { ReactElement, useEffect, useState } from "react";
import * as Styled from './styles'

import { ICard } from "@/interfaces/ICard";
import CardServices from "src/services/cards";
import Card from "src/components/Card/Card";

import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ErrorFeedback from "src/components/ErrorFeedback/ErrorFeedback";
import CardsCarousel from "src/components/CardsCarousel/CardsCarousel";

export default function Cards(): ReactElement {

    const location = useLocation()

    const [selectedCard, setSelectedCard] = useState<ICard | null>(null)
    const { data: cards, isLoading, error } = useQuery({ 
        queryKey: ['cards'],
        queryFn: () => CardServices.get()
    })

    console.log(cards)

    // useEffect(() => {
    //     if (cards !== undefined) {
    //         setSelectedCard(cards[0])
    //         location.pathname === "/cards/add" && setSelectedCard(null)
    //         location.pathname === "/cards" && setSelectedCard(cards[0])
    //     }
    // }, [cards, location.pathname])

    if (error) return <ErrorFeedback> { error.message } </ErrorFeedback>

    return (
        <Styled.Container>
            {/* <header>
                <CardsCarousel 
                    data={cards}
                    cardSelected={value => setSelectedCard(value)}
                />
            </header>
            <main>
                { cards?.length === 0  ?
                    <p> Nâo há nenhum cartão adicionado. Tente cadastrar um para prosseguir </p>
                    :
                    selectedCard !== null &&
                        <Card
                            id={selectedCard.id}
                            number={selectedCard.number}
                            date={selectedCard.date}
                            cvv={selectedCard.cvv}
                            name={selectedCard.name}
                        />
                }
                <Outlet />
            </main> */}



            
            {/* { cards === undefined || isLoading ?
                <>
                <aside>
                    <Skeleton className="w-[60px] h-full rounded-[10px]" />
                </aside>
                <main>

                </main>
                </>
                :
                <>
                <aside>
                    <Carousel
                        opts={{ align: "start", }}
                        orientation="vertical"
                        className="pt-[78px]"
                    >
                        <Styled.CreateCard to={"/cards/add"}>
                            <Plus/>
                        </Styled.CreateCard>
                        <CarouselContent className="h-[240px]">
                            { cards.map((_, key) => (
                                <Styled.Item 
                                    key={key}
                                    $active={selected === key} 
                                    onClick={() => setSelected(key)} 
                                    className="basis-1/3"
                                >
                                    <Link to={"/cards"}> { key + 1 } </Link>
                                </Styled.Item>
                            )) }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </aside>
                <main>
                    { cards.length === 0  ?
                        <p> Nâo há nenhum cartão adicionado. Tente cadastrar um para prosseguir </p>
                        :
                        selected !== null &&
                        <Card
                            id={cards[selected].id}
                            number={cards[selected].number}
                            date={cards[selected].date}
                            cvv={cards[selected].cvv}
                            name={cards[selected].name}
                        />
                    }
                    <Outlet />
                </main>
                </>
            } */}
        </Styled.Container>
    )
}