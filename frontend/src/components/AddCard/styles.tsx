import styled from "styled-components";

export const Container = styled.div `
    flex: 1;
    height: 100%;
    padding-inline: 30px;

    h3 {
        margin-bottom: 25px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > div {
            display: flex;
            gap: 15px;
        }

        button {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            border-radius: 10px;
            border: none;
            cursor: pointer;
            margin-left: auto;

            &:disabled {
                cursor: default;
            }
        }
    }
`