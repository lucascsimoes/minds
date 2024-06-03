export interface ITransaction {
    id: number
    type: string
    description: string | null
    value: number
    date: string
    userId: string | null
}