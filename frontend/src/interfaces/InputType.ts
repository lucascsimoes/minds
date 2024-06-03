import { InputHTMLAttributes, ReactElement } from "react"

export type InputType = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    size?: 'sm' | 'md' | 'lg'
    error?: boolean
    iconLeft?: ReactElement
    inForm?: boolean
    hasMask?: boolean
}