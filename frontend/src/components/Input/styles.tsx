import styled from "styled-components";
import { InputType } from "@/interfaces/InputType";

interface ContainerInputProp extends Pick<InputType, 'size'> {
    $hasIconLeft: boolean
    $error?: string | boolean
    width?: number | string
}

export const Container = styled.div<ContainerInputProp> `
    position: relative;
    width: ${({ width }) => width ? width : "100%"};
    height: ${({ size }) => size === 'sm' ? '50px' : size === 'md' ? '60px' : '70px'};
    flex-grow: 1;
    display: flex;
    align-items: center;

    input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 1px solid var(--card-foreground);
        border-radius: 10px;
        font-size: ${({ size }) => size === 'sm' ? '14px' : size === 'md' ? '20px' : '25px'};
        padding-inline: ${({ $hasIconLeft }) => $hasIconLeft ? '60px 20px' : '20px'};
        letter-spacing: ${({ size }) => size === 'sm' ? '0' : size === 'md' ? '1px' : '2px'};
        outline: ${({ $error }) => $error ? '1px solid #ef4444' : 'none'};

        &::placeholder {
            font-size: 13px;
            letter-spacing: 0;
            color: ${({ $error }) => $error === "inline" ? '#ef4444' : null }
        }
    }

    svg {
        position: absolute;
        inset-block: 0;
        margin-block: auto;
        left: 20px;
    }
`