import { ICard } from "./ICard"
import { ITransaction } from "./ITransaction"
import { IUser } from "./IUser"

export interface ResponseType {
    message: string
    data?: ICard[] | ITransaction[] | IUser
}