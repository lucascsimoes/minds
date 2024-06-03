import styled from "styled-components";

export const Container = styled.section `
    position: relative;
    margin-top: 50px;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ffffff50;
        margin-bottom: 15px;

        & > div {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            background: transparent;
            transition: background cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
            
            &:hover {
                background: #ffffff20;
                transition: background cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
            }
        }
    }
    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        background: linear-gradient(to right, #dc2626, #b91c1c);
        padding: 5px 8px;
        border-radius: 5px;
    }

    & > h1 { font-size: 40px; }
`