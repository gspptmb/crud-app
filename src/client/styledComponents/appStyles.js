import styled from 'styled-components';

export const RootContainer = styled.div`
    min-width: 100vw;
    min-height: 100vh;
`;

export const LoginContainer = styled.div`
    min-width: 100vw;
    min-height: 80vh;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Text = styled.p`
    font-size: 2.2rem;
    font-family: sans-serif;
    font-weight: bold;
`;

export const Input = styled.input`
    height: 2.2rem;
    width: 250px;
    border-color: grey;
    border-width: thin;
    margin-bottom: 1.4rem;
    padding: 5px;
`;

export const Button = styled.button`
    height: 1.9rem;
    width: 85px;
    font-family: sans-serif;
    margin-top: 1.2rem;
    background-color: #22313f;
    color: white;
    border-radius: 0.8rem;
`;

export const Header = styled.div`
    min-width: 100vw;
    min-height: 5vh;
    background-color: #22313f;
`;

export const Footer = styled.div`
    min-width: 100vw;
    min-height: 15vh;
    background-color: #2ecc71;
`;
