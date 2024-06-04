import { ReactElement, useState } from "react";
import * as Styled from './styles'

import { ITransaction } from "@/interfaces/ITransaction";
import services from "src/services/services";
import { SwapAllToStrings } from "@/interfaces/SwapAllToString";
import getFromToken from "src/services/getFromToken";

import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";

import dayjs from "dayjs";
import { Minus, Plus, Send, TrendingDown, TrendingUp } from "lucide-react";
import { Field, Formik, FormikHelpers } from "formik";
import { useQueries } from "@tanstack/react-query";

type TransactionWithoutId = Omit<SwapAllToStrings<ITransaction>, "id" | "userId">
const initialValues: TransactionWithoutId = { 
    type: 'Depósito',
    value: "",
    description: '', 
    date: dayjs().format('DD/MM/YYYY')
}



export default function Transaction(): ReactElement {

    const [{ refetch: refetchTransactions }, { refetch: refetchUser }] = useQueries({
        queries: [
            { queryKey: ['transactions'] },
            { queryKey: ['user'] }
          ]
    });

    const [option, setOption] = useState<number>(0)
    const handleSubmit = async (values: TransactionWithoutId, { setSubmitting, resetForm }: FormikHelpers<TransactionWithoutId>) => {
        const formatedDate = formatDate(values.date)
        const checkDescription = values.description === "" ? null : values.description
        const newValues = {
            type: values.type,
            value: Number(values.value),
            description: checkDescription,
            date: formatedDate
        }

        const userId = getFromToken.id()
        await services.transaction.post({ ...newValues, userId })
        refetchTransactions()
        refetchUser()

        setSubmitting(false)
        resetForm()
    };

    function formatDate(date: string): string {
        const day = date.split("/")[0]
        const month = date.split("/")[1]
        const year = date.split("/")[2]

        return `${year}-${month}-${day}`
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
            {({ isSubmitting }) => (
            <Styled.FormTransaction>
                <header role="group">
                    <label onClick={() => setOption(0)}>
                        <Field hidden type="radio" name="type" value="Depósito"/>
                        <Styled.OptionButton $active={option === 0}>
                            <TrendingUp size={18} />
                            <p> Depósito </p>
                        </Styled.OptionButton>
                    </label>
                    <label onClick={() => setOption(1)}>
                        <Field hidden type="radio" name="type" value="Transferência"/>
                        <Styled.OptionButton $active={option === 1}>
                            <TrendingDown size={18} />
                            <p> Transferência </p>
                        </Styled.OptionButton>
                    </label>
                </header>
                
                <section>
                    <Input 
                        size="sm"
                        inForm={true}
                        id="description" 
                        name="description" 
                        placeholder={`Descrição ${ option === 0 ? "do depósito" : "da transferência" }`}
                    />
                    
                    <Input 
                        id="date" 
                        name="date" 
                        placeholder="DD/MM/AAAA"
                        width={200}
                        size="sm"
                        inForm={true}
                        hasMask={true}
                        mask="__/__/____" 
                        replacement={{ _: /\d/ }} 
                    />
                </section>

                <footer>
                    <Input 
                        id="value" 
                        name="value" 
                        size="lg"
                        inForm={true}
                        hasMask={true}
                        mask="_______.__" 
                        replacement={{ _: /\d/ }} 
                        iconLeft={ option === 0 ? <Plus size={28} color="#059669"/> : <Minus size={28} color="#dc2626"/> }
                    />
                    <button type="submit" disabled={isSubmitting}>
                        { isSubmitting ? <Spinner size={25} stroke={3}/> : <Send size={23} color="#fff"/> }
                    </button>
                </footer>
            </Styled.FormTransaction>
            )}
        </Formik>
    )
}