import { ReactElement, useContext } from "react";
import * as Styled from './styles'

import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Introduction from "../../components/Introduction";
import Extract from "../../components/Extract";
import Transaction from "../../components/Transaction/Transaction";

export default function App(): ReactElement {

    const location = useLocation();

    return (
        <Styled.Container>
            <Sidebar/>
            <main>
                <Introduction/>
                <footer>
                    {location.pathname === '/' && (
                        <div>
                            <h3> Nova transação </h3>
                            <Transaction />
                        </div>
                    )}
                    <Outlet />
                </footer>
            </main>
            <section>
                <h3> Extrato da conta </h3>
                <Extract/>
            </section>
        </Styled.Container>
    )
}