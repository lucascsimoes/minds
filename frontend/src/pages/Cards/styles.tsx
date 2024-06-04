import styled from "styled-components";


export const Container = styled.div `
    gap: 40px;

    & > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;

        aside {
            display: flex;
            gap: 10px;
        }
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