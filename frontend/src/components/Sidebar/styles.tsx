import styled from "styled-components";

export const Container = styled.aside `
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid var(--card);
    height: 100%;
    border-radius: 15px;

    footer {
        border-top: 1px solid var(--card-foreground);
        margin-top: auto;
        padding-top: 16px;
    }
`