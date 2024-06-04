import { ReactElement } from "react";
import * as Styled from './styles'

import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";

import { ICard } from "@/interfaces/ICard";
import { SwapAllToStrings } from "@/interfaces/SwapAllToString";
import getFromToken from "src/services/getFromToken";
import services from "src/services/services";

import { Form, Formik, FormikHelpers } from "formik";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



type CardWithoutId = Omit<SwapAllToStrings<ICard>, "id">

export default function AddCard({ values }: { values: ICard | undefined}): ReactElement {

    const navigate = useNavigate()

    const initialValues: CardWithoutId = { 
        number: "",
        date: "",
        name: "",
        cvv: ""
    }

    const { refetch } = useQuery<ICard[]>({ queryKey: ['cards'] })

    const handleSubmit = async (values: CardWithoutId, { setSubmitting, resetForm }: FormikHelpers<CardWithoutId>) => {
        const newValues = {
            userId: getFromToken.id(),
            number: values.number,
            date: values.date,
            name: values.name,
            cvv: Number(values.cvv)
        }

        await services.card.post(newValues)
        refetch()

        setSubmitting(false)
        navigate("/cards")
    };

    return (
        <Styled.Container>
            <h3> Novo cartão </h3>
            
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                <Form>
                    <Input
                        id="number"
                        name="number"
                        inForm={true}
                        hasMask={true}
                        placeholder="Número do cartão" 
                        mask="____ ____ ____ ____" 
                        replacement={{ _: /\d/ }}
                    />

                    <Input
                        id="name"
                        name="name"
                        inForm={true}
                        placeholder="Nome informado no cartão" 
                    />

                    <div>
                        <Input
                            id="date"
                            name="date"
                            inForm={true}
                            hasMask={true}
                            placeholder="Data de validade"
                            mask="__/__"
                            replacement={{ _: /\d/ }}
                        />
                        <Input
                            id="cvv"
                            name="cvv"
                            inForm={true}
                            hasMask={true}
                            placeholder="CVV"
                            mask="____"
                            replacement={{ _: /\d/ }}
                        />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        { isSubmitting ? <Spinner size={25} stroke={3}/> : <Send size={23} color="#fff"/> }
                    </button>
                </Form>
                
            )}
            </Formik>
        </Styled.Container>
    )
}