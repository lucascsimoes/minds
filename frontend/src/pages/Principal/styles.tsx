import styled from "styled-components";

export const Container = styled.main `
    display: grid;
    grid-template-columns: 250px 1fr minmax(200px, 300px);
    gap: 15px;
    min-height: 100dvh;
    max-width: 1400px;
    padding-block: 60px;
    width: 100%;
    margin: 0 auto;

    & > main {
        display: flex;
        flex-direction: column;

        & > footer {
            position: relative;
            flex: 1;
            border-radius: 20px;
            padding: 40px;
            background: var(--card);
        }
    }

    & > section {
        position: relative;
        width: 300px;
        border-radius: 20px;
        background: var(--card);
        padding: 30px;

        & > p {
            text-align: center;
            margin-block: 50px 25px;
        }


        & > a {
            display: flex;
            background: var(--card-foreground);
            font-size: 13px;
            padding: 13px 15px;
            border-radius: 10px;
            transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);
            width: fit-content;
            margin: 0 auto;

            &:hover {
                background: var(--card-secondary);
                transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
        }
    }
`