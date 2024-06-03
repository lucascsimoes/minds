import { Link } from "react-router-dom";
import styled from "styled-components";

interface ContainerProps {
    $active: boolean
}

export const Container = styled(Link)<ContainerProps> `
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border-radius: 8px;
    margin-block: 5px;
    background: ${({ $active }) => $active ? "linear-gradient(to right, var(--primary), var(--secondary))" : "transparent"};
    cursor: ${({ $active }) => $active ? "default" : "pointer"};
    transition: background .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    
    &:hover {
        background: ${({ $active }) => !$active && "var(--card)"};
        transition: background .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    p {
        font-size: 15px;
    }
`