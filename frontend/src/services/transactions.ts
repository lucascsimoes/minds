import axios from "axios"
import { ITransaction } from "@/interfaces/ITransaction"
import getFromToken from "./getFromToken"
import { toast } from "sonner"

const transaction = {
    get: async (): Promise<ITransaction[]> => {
        try {
            const response = await axios.get(`http://localhost:8000/transaction/${ getFromToken.id() }`)
            return response.data.transactions
        } catch (e) {
            throw new Error("Houve um erro ao recuperar suas transações. Tente novamente mais tarde.")
        }
    },

    post: async ({ ...props }: Omit<ITransaction, '_id'>) => {
        try {
            const response = await axios.post("http://localhost:8000/transaction", props)
            return toast.success(response.data.message)
        } catch (e) {
            return toast.error("Houve um erro ao adicionar a transação. Tente novamente mais tarde.")
        }
    }
}

export default transaction