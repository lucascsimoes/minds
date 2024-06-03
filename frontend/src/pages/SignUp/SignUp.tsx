import { ReactElement } from "react";
import * as Styled from './styles'

import Input from "src/components/Input/Input";
import Spinner from "src/components/Spinner/Spinner";
import UserServices from "src/services/users";
import { IUser } from "src/interfaces/IUser";

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserContext } from "src/context";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'O nome é muito curto (mínimo 2 caracteres)')
        .max(45, 'O nome é muito longo (máximo 45 caracteres)')
        .required('O nome é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    password: Yup.string()
        .required('A senha é obrigatória'),
    confirmPassword: Yup.string()
        .required('A confirmação de senha é obrigatória')
        .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
    
});

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

interface SignUpTypes {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp(): ReactElement {

    const navigate = useNavigate()
    const { data, setData } = useUserContext()

    const handleSubmit = async (values: SignUpTypes, { setSubmitting }: FormikHelpers<SignUpTypes>) => {
        const newValues: IUser = {
            name: values.name,
            email: values.email,
            balance: 0,
            password: values.password
        }

        const { status, message, token } = await UserServices.post(newValues)

        if (status !== 201) {
            toast.error(message)
        } else {
            setData({ 
                name: newValues.name, 
                balance: newValues.balance 
            })
            await sessionStorage.setItem("token", token)
            navigate("/")
        }

        setSubmitting(false)
    };

    return (
        <Styled.Container>
            <header>
                <p> CRIAR CONTA </p>
                <h1> Comece a controlar sua vida financeira </h1>
            </header>
            <main>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={SignupSchema}
                >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <fieldset>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Nome"
                                inForm={true}
                                error={(errors.name && touched.name) ? true : false}
                            />
                            { (errors.name && touched.name) && <p> { errors.name } </p> }
                        </fieldset>
                        
                        <fieldset>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Endereço de Email"
                                inForm={true}
                                error={(errors.email && touched.email) ? true : false}
                            />
                            { (errors.email && touched.email) && <p> { errors.email } </p> }
                        </fieldset>

                        <fieldset>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Senha"
                                type="password"
                                inForm={true}
                                error={(errors.password && touched.password) ? true : false}
                            />
                            { (errors.password && touched.password) && <p> { errors.password } </p> }
                        </fieldset>

                        <fieldset>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirmação da senha"
                                type="password"
                                inForm={true}
                                error={(errors.confirmPassword && touched.confirmPassword) ? true : false}
                            />
                            { (errors.confirmPassword && touched.confirmPassword) && <p> { errors.confirmPassword } </p> }
                        </fieldset>

                        <button type="submit" disabled={isSubmitting}>
                            { isSubmitting ? <Spinner size={25} stroke={3}/> : "Cadastrar-se" }
                        </button>
                    </Form>
                )}
                </Formik>
            </main>

            <p> Já possui uma conta? <Link to={"/signin"}> Acessar conta </Link> </p>
        </Styled.Container>
    )
}