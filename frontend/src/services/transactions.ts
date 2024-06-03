import axios from "axios"
import { ITransaction } from "@/interfaces/ITransaction"
import getFromToken from "./getFromToken"

const TransactionServices = {
    get: async (): Promise<ITransaction[]> => {
        try {
            const response = await axios.get(`http://localhost:8000/transaction/${ getFromToken.id() }`)
            return response.data.transactions
        } catch (e) {
            throw new Error("Houve um erro ao recuperar suas transações. Tente novamente mais tarde.")
        }
    },

    post: async ({ ...props }: Omit<ITransaction, 'id'>) => {
        try {
            const response = await axios.post("http://localhost:8000/transaction", props)
            return {
                status: response.status,
                message: response.data.message
            }
        } catch (e) {
            return {
                status: 500,
                message: "Houve um erro ao adicionar a transação. Tente novamente mais tarde."
            } 
        }
    }
}

export default TransactionServices