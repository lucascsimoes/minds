import axios from "axios"
import { ICard } from "@/interfaces/ICard"
import { toast } from "sonner"

const card = {
    get: async (): Promise<ICard[]> => {
        try {
            const response = await axios.get("http://localhost:8000/card")
            return response.data.cards
        } catch (e) {
            throw new Error("Houve um erro ao consultar seus cartões. Tente novamente mais tarde.")
        }
    },

    post: async ({ ...props }: Omit<ICard, 'id'>) => {
        try {
            const response = await axios.post("http://localhost:8000/card", props)
            return toast.success(response.data.message)
        } catch (e) {
            return toast.error("Houve um erro ao adicionar o seu cartão. Tente novamente mais tarde.")
        }
    }
}


export default card
