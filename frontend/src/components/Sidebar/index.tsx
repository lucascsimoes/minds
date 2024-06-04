import { ReactElement } from "react";
import * as Styled from './styles'

import Link from "../Link";
import { useLocation } from "react-router-dom";

import { routes } from "../../routes";
import { LogOut } from "lucide-react";

export default function Sidebar(): ReactElement {

    const pathname = useLocation().pathname

    return (
        <Styled.Container>
            { routes.map((route, key) => {
                const path = route.path.slice(1)
                const link = pathname.split("/")[1]

                return (
                    <Link
                        key={key}
                        icon={route.icon}
                        path={route.path}
                        $active={link === path}
                    >
                        { route.name }
                    </Link>
                )
            })}

            <footer>
                <Link
                    icon={<LogOut size={20} strokeWidth={1.5}/>}
                    path={"/signin"}
                    $active={false}
                    onClick={() => sessionStorage.removeItem(('token'))}
                > Sair </Link>
            </footer>
        </Styled.Container>
    )
}