import axios from "axios"
import getFromToken from "./getFromToken"

const userInfos = {
    get: async () => {
        try {
            const response = await axios.get(`http://localhost:8000/auth/${ getFromToken.id() }`)
            return {
                balance: response.data.user.balance,
                name: response.data.user.name
            } 
        } catch (e) {
            throw new Error("Não é possível entrar nesse momento. Tente novamente mais tarde")
        }
    }
}

export default userInfos
