import { ISpinner } from "@/interfaces/ISpinner";
import styled from "styled-components";

export const Container = styled.div<ISpinner> `
    position: absolute;
    inset: 0;
    margin: auto;
    width: ${({ size }) => size + 'px'};
    height: ${({ size }) => size + 'px'};
    border-radius: 50%;
    border: ${({ color, stroke }) => `${ stroke }px solid ${ color }`};
    animation: spinner-bulqg1 0.96s infinite linear alternate,
        spinner-oaa3wk 1.92s infinite linear;

    @keyframes spinner-bulqg1 {
        0% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%); }
        12.5% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%); }
        25% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%); }
        50% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
        62.5% { clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
        75% { clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%); }
        100% { clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%); }
    }

    @keyframes spinner-oaa3wk {
        0% { transform: scaleY(1) rotate(0deg); }
        49.99% { transform: scaleY(1) rotate(135deg); }
        50% { transform: scaleY(-1) rotate(0deg); }
        100% { transform: scaleY(-1) rotate(-135deg); }
    }
`