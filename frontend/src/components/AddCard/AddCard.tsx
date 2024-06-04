import { ReactElement } from "react";
import * as Styled from './styles'

import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";

import { ICard } from "@/interfaces/ICard";
import { SwapAllToStrings } from "@/interfaces/SwapAllToString";
import getFromToken from "src/services/getFromToken";
import services from "src/services/services";

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from "formik";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type CardWithoutId = Omit<SwapAllToStrings<ICard>, "_id">

const CardSchema = Yup.object().shape({
    number: Yup.string()
        .min(16, 'O número do cartão é muito curto (mínimo 16 caracteres)')
        .required('O número é obrigatório'),
    name: Yup.string()
        .required('O nome é obrigatório'),
    date: Yup.string()
        .required('A data de validade é obrigatória'),
    cvv: Yup.string()
        .required('O CVV é obrigatório')
    
});

const initialValues: CardWithoutId = { 
    number: "",
    date: "",
    name: "",
    cvv: ""
}



export default function AddCard({ values }: { values: ICard | undefined}): ReactElement {

    const navigate = useNavigate()
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
            
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={CardSchema}
            >
                {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Input
                        id="number"
                        name="number"
                        inForm={true}
                        hasMask={true}
                        placeholder={errors.number ?? "Número do cartão"}
                        mask="____ ____ ____ ____" 
                        replacement={{ _: /\d/ }}
                        error={(errors.number && touched.number) ? 'inline' : false}
                    />

                    <Input
                        id="name"
                        name="name"
                        inForm={true}
                        placeholder={errors.name ?? "Nome informado no cartão"}
                        error={(errors.name && touched.name) ? 'inline' : false}
                    />

                    <div>
                        <Input
                            id="date"
                            name="date"
                            inForm={true}
                            hasMask={true}
                            placeholder={errors.date ?? "Data de validade"}
                            mask="__/__"
                            replacement={{ _: /\d/ }}
                            error={(errors.date && touched.date) ? 'inline' : false}
                        />
                        <Input
                            id="cvv"
                            name="cvv"
                            inForm={true}
                            hasMask={true}
                            placeholder={errors.cvv ?? "CVV"}
                            mask="____"
                            replacement={{ _: /\d/ }}
                            error={(errors.cvv && touched.cvv) ? 'inline' : false}
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