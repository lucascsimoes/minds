import axios from "axios"
import { IUser } from "@/interfaces/IUser"

const UserServices = {
    post: async ({ ...props }: Omit<IUser, 'id'>) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/register", props)
            return {
                status: response.status,
                message: response.data.message,
                token: response.data.token
            }
        } catch (e) {
            return {
                status: 500,
                message: "Houve um erro ao cadastrar. Tente novamente mais tarde."
            } 
        }
    },

    postLogin: async ({ ...props }: Omit<IUser, 'name' | 'balance'>) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", props)
            return {
                status: response.status,
                message: response.data.message,
                token: response.data.token
            }
        } catch (e) {
            return {
                status: 500,
                message: "Houve um erro ao acessar. Tente novamente mais tarde."
            } 
        }
    },
}

export default UserServices

// export async function postUser({ ...props }: IUser) {
//     try {
//         const response = await axios.post("http://localhost:8000/users", props)

//         if (response.data.status !== 200) {
//             return { status: response.data.status, message: response.data.message }
//         } else {
//             return { 
//                 status: response.data.status,
//                 message: response.data.message,
//                 data: JSON.parse(response.config.data),
//                 token: response.data.access_token
//             }
//         }
        
//     } catch (e) {
//         return { status: 500, message: 'Houve um erro ao registrar o usuário. Tente novamente mais tarde' }
//     }
// }