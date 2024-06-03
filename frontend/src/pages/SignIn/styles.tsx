import styled from "styled-components";

export const Container = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100dvh;

    header {
        margin: 0 auto;
        width: fit-content;
        text-align: center;

        p {
            letter-spacing: 7px;
            font-size: 12px;
        }

        h1 {
            font-size: 30px;
            margin-top: 5px;
        }
    }

    main {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-block: 30px 10px;

        form {
            max-width: 400px;
            width: 100%;

            fieldset {
                margin-block: 10px;

                p {
                    color: #ef4444;
                    margin-block: 5px 10px;
                }

                &:nth-child(3) {
                    margin-top: 30px;
                }
            }

            button {
                position: relative;
                width: 100%;
                height: 54px;
                padding: 15px 6px;
                border-radius: 10px;
                margin-top: 20px;
                background: linear-gradient(to right, var(--primary), var(--secondary))
            }
        }

        aside {
            background-color: var(--card);
            border-radius: 10px;
            padding: 30px;
        }
    }

    & > p {
        text-align: center;
        margin-top: 10px;

        a {
            color: var(--primary);
        }
    }
`