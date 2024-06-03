import styled from "styled-components";


export const Container = styled.div `
    gap: 40px;

    & > header {
        padding-inline: 50px;
        margin-bottom: 20px;
    }

    & > aside {
        width: 60px;
        padding-block: 40px;
    }

    & > main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
`