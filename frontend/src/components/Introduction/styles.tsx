import styled from "styled-components";

export const Container = styled.main `
    display: flex;
    border-radius: 20px;
    min-height: 300px;
    border: 1px solid var(--card);
    background: linear-gradient(to right, var(--primary), var(--secondary));
    padding: 40px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;

    main {
        position: relative;
        z-index: 1;
        max-width: 60%;
        width: 100%;

        & > h1 { font-size: 30px; }

        & > p {
            margin-top: 10px;
            font-size: 14px;
            opacity: .7;
        }
    }

    & > img {
        position: absolute;
        top: 0;
        right: -200px;
        opacity: .1;
    }
`