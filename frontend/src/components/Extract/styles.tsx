import styled from "styled-components";

interface FilterButtonProps {
    $active: boolean
}

export const Container = styled.div `
    & > div:first-child {
        display: flex;
        gap: 8px;
        margin-block: 10px 30px;
    }
`

export const FilterButton = styled.button<FilterButtonProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 34px;
    width: 0;
    height: 34px;
    border-radius: 8px;
    background: ${({ $active }) => $active ? "var(--card-foreground)" : "transparent"};
    border: ${({ $active }) => $active ? "1px solid var(--card-foreground)" : "1px dashed var(--card-secondary)"};
    cursor: pointer;
    transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
        background: var(--card-foreground);
        transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    path, polyline {
        color: ${({ $active }) => $active ? "#fff" : "#ffffff40"};
    }
`