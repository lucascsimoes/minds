import styled from "styled-components";

interface SquareProps {
    balance: number | undefined
}

export const Container = styled.div `
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    gap: 3px;
    width: min-content;
`

export const Square = styled.div<SquareProps> `
    width: 18px;
    height: 18px;
    background: ${({ balance }) => 
        balance === undefined ? 'var(--card-foreground)' :
        balance > 0 ? '#059669' :
        balance < 0 ? '#dc2626' : 
        '#eab308' } ;
`