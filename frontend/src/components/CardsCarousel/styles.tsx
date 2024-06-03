import styled from "styled-components";
import { Link } from "react-router-dom";

interface ItemProps {
    $active?: boolean
}

export const Container = styled.div `
    display: flex;
    justify-content: center;
    width: 100%;
    /* height: 80px;
    border-radius: 20px;
    border: 1px solid var(--card);
    margin-block: 10px; */
`

export const Item = styled(Link)<ItemProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 180px;
    height: 100%;
    border-radius: 10px;
    border: ${({ $active }) => $active ? "1px dashed var(--card-foreground)" : "1px dashed var(--card-secondary)"};
    padding: 0;
    cursor: pointer;
    user-select: none;
    background: ${({ $active }) => $active ? "var(--card-foreground)" : "transparent"};
    transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);

    header {
        display: flex;
        align-items: center;
        gap: 8px;

        & > span {
            font-size: 14px;
        }

        & > p > span {
            font-size: 10px;
        }
    }

    &:hover {
        background: var(--card-foreground);
        transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`

export const CreateCard = styled(Item).attrs({ as: Link }) `
    position: absolute;
    width: 60px;
    top: 0;
    left: 0;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    border: transparent;
    z-index: 1;

    &:hover { background: linear-gradient(to right, var(--primary), var(--secondary)); }
`