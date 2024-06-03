import { ReactElement } from "react";
import * as Styled from './styles'

import { InputType } from "@/interfaces/InputType";
import { Field, FieldProps } from "formik";
import { InputMask, MaskProps } from "@react-input/mask";

type InputPropsWithMask = MaskProps & InputType
type InputPropsWithField = FieldProps & InputType
type InputPropsWithMaskField = InputPropsWithMask & InputPropsWithField
type InputProps = InputPropsWithMask | InputPropsWithField | InputPropsWithMaskField

export default function Input(props: InputProps): ReactElement {

    const { 
        type = 'text', 
        size = "sm", 
        error = false,
        iconLeft, 
        hasMask, 
        inForm,
        ...restProps
    } = props
    

    return (
        <Styled.Container size={size} width={props.width} $error={error} $hasIconLeft={!!iconLeft}>
            { iconLeft }
            { hasMask && inForm ?
                <Field as={InputMask} type={type} { ...restProps }/>
                : 
                hasMask ?
                <InputMask type={type} { ...restProps }/>
                :
                inForm ?
                <Field type={type} { ...restProps }/>
                :
                <input type={type} { ...restProps }/>
            }
        </Styled.Container>
    )
}