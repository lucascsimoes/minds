import { ReactElement, useState } from "react";
import * as Styled from './styles'

import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import useBalance from "../../hooks/useBalance";

export default function Balance(): ReactElement {

    const [balance] = useBalance()
    const [hide, setHide] = useState(true)
    const handleHide = () => setHide(value => !value)

    return (
        <Styled.Container>
            <header>
                <p> Saldo </p>
                <div onClick={handleHide}>
                    { hide ? <Eye size={22} strokeWidth={1.5}/> : <EyeOff size={22} strokeWidth={1.5}/>}
                </div>
            </header>

            { (Number(balance) < 0 && !hide) &&
                <div>
                    <TriangleAlert size={20}/>
                    <p> Cuidado! Você está negativado(a) </p>
                </div>
            }

            <h1> { hide ? "*******" : "R$ " + balance } </h1>
        </Styled.Container>
    )
}