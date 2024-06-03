import styled from "styled-components";
import { Form } from "formik";

interface OptionButtonProps {
    $active: boolean
}

export const OptionButton = styled.div<OptionButtonProps> `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 15px;
    border-radius: 8px;
    background: ${({ $active }) => $active ? "var(--card-foreground)" : "transparent"};
    border: ${({ $active }) => $active ? "1px solid var(--card-foreground)" : "1px dashed var(--card-secondary)"};
    cursor: pointer;
    transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
        background: var(--card-foreground);
        transition: background .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    path, polyline, p {
        color: ${({ $active }) => $active ? "#fff" : "#ffffff40"};
    }
`

export const FormTransaction = styled(Form) `
    header {
        display: flex;
        gap: 10px;
        margin-block: 10px 40px;
    }

    section {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    & > footer {
        display: flex;
        gap: 10px;

        button {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            border-radius: 10px;
            border: none;
            cursor: pointer;

            &:disabled {
                cursor: default;
            }
        }
    }
`