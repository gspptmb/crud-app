import React, { useState } from 'react';
import {
    RootContainer,
    Text,
    Input,
    LoginContainer,
    Button,
    Footer,
    Header,
} from './styledComponents/appStyles';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (evt) => {
        const userInputedValue = evt.target.value;
        evt.target.name === 'username'
            ? setUsername(userInputedValue)
            : setPassword(userInputedValue);
    };

    return (
        <RootContainer>
            <Header />
            <LoginContainer>
                <Text>Sign In</Text>
                <Input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <Button>Login</Button>
            </LoginContainer>
            <Footer></Footer>
        </RootContainer>
    );
};

export default App;
