import styled from "styled-components";


export const Container = styled.div `
        
    & > p {
        margin-bottom: 5px;
        font-size: 12px;
        opacity: .5;
        word-spacing: 5px;
        font-weight: normal;
        text-align: left;
    }

    div {
        display: flex;
        align-items: center;
        gap: 8px;

        p {
            font-weight: 500;
            font-size: 16px;
        }
    }
`

export const Content = styled.div `
    h5 {
        font-weight: normal;
        opacity: .5;
        margin-bottom: 5px;
    }

    p {
        font-size: 13px;
    }
`