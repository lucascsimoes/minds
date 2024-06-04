import { ReactElement } from "react";
import * as Styled from './styles'

import Input from "src/components/Input/Input";
import Spinner from "src/components/Spinner/Spinner";

import services from "src/services/services";
import { useUserContext } from "src/context";

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    password: Yup.string()
        .required('A senha é obrigatória')
});

const initialValues = {
    email: '',
    password: ''
}

interface SignInTypes {
    email: string,
    password: string
}

export default function SignIn(): ReactElement {

    const { data, setData } = useUserContext()
    const navigate = useNavigate()

    const handleSubmit = async (values: SignInTypes, { setSubmitting }: FormikHelpers<SignInTypes>) => {
        const newValues: SignInTypes  = {
            email: values.email,
            password: values.password
        }

        await services.user.postLogin(newValues)
        if (sessionStorage.getItem('token')) {
            navigate("/")
        }
    };

    return (
        <Styled.Container>
            <header>
                <p> ACESSAR CONTA </p>
                <h1> Seja bem-vindo(a) de volta! </h1>
            </header>
            <main>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={SigninSchema}
                >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
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

                        <button type="submit" disabled={isSubmitting}>
                            { isSubmitting ? <Spinner size={25} stroke={3}/> : "Entrar" }
                        </button>
                    </Form>
                )}
                </Formik>
            </main>

            <p> Ainda não possui uma conta? <Link to={"/signup"}> Cadastre-se </Link> </p>
        </Styled.Container>
    )
}