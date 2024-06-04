import { ReactElement, useEffect, useState } from "react";
import * as Styled from './styles'

import { ICard } from "@/interfaces/ICard";
import services from "src/services/services";
import Card from "src/components/Card/Card";

import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ErrorFeedback from "src/components/ErrorFeedback/ErrorFeedback";
import Spinner from "src/components/Spinner/Spinner";
import { ComboboxDemo } from "src/components/ui/combobox";
import { Button } from "src/components/ui/button";


export default function Cards(): ReactElement {

    const location = useLocation()
    const navigate = useNavigate()

    const [selectedCard, setSelectedCard] = useState<ICard | undefined>(undefined)
    const { data: cards, isLoading, error } = useQuery({ 
        queryKey: ['cards'],
        queryFn: () => services.card.get()
    })

    useEffect(() => {
        if (cards !== undefined) {
            setSelectedCard(cards[0])
            location.pathname === "/cards/add" && setSelectedCard(undefined)
            location.pathname === "/cards" && setSelectedCard(cards[0])
        }
    }, [cards, location.pathname])

    function replaceCardString(str: string) {
        const numeroArray = str.split('');
      
        for (let i = 0; i < numeroArray.length - 4; i++) {
          if (!isNaN(Number(numeroArray[i])) && numeroArray[i] !== ' ') {
            numeroArray[i] = '●';
          }
        }
      
        return numeroArray.join('');
    }

    if (error) return <ErrorFeedback> { error.message } </ErrorFeedback>
    if (isLoading || cards === undefined) return <Spinner/>

    const comboboxList = cards.map(card => {
        return {
          value: card.number,
          label: replaceCardString(card.number)
        }
    })

    const handleSelected = (value: string | null) => {
        setSelectedCard(cards.find(card => card.number === value))
    }

    return (
        <Styled.Container>
            <header>
                <aside>
                    <Button variant={"create"} onClick={() => navigate("/cards/add")}> Adicionar cartão </Button>
                    <Button variant={"ghost"}> Editar </Button>
                    <Button variant={"ghost"}> Excluir </Button>
                </aside>
                { location.pathname === "/cards/add" ?
                    <Button variant={"secondary"} onClick={() => navigate("/cards")}> Cancelar </Button>
                    :
                    <ComboboxDemo 
                        list={comboboxList}
                        selected={(value) => handleSelected(value)}
                    />
                }
            </header>
            <main>
                { !isLoading && cards.length === 0 ?
                    <p> Nâo há nenhum cartão adicionado. Tente cadastrar um para prosseguir </p>
                    :
                    selectedCard !== undefined &&
                        <Card
                            _id={selectedCard._id}
                            number={selectedCard.number}
                            date={selectedCard.date}
                            cvv={selectedCard.cvv}
                            name={selectedCard.name}
                        />
                }
                <Outlet />
            </main>



            
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