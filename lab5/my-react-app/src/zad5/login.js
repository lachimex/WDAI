import React, { useState } from 'react';
import axios from 'axios';
import "./zad5.css"

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [state, setState] = useState("default");

    function setConfirmationPassword(confirmationPassword){
        if (confirmationPassword != password){
            setMessage("hasła są różne");
        }
        else{
            setMessage("");
        }
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: username,
                password: password,
            });
            setToken(response.data.token);
            setState("logged in");
            setMessage('zalogowano');
        } catch (error) {
            setMessage('Invalid username or password');
        }
    };

    const handleProtectedRequest = async () => {
        try {
            const response = await axios.get('http://localhost:5000/protected', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage(`Protected data: ${JSON.stringify(response.data)}`);
        } catch (error) {
            setMessage('Authentication failed. Please login first.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: username,
                password: password,
            });
            setMessage(JSON.stringify(response.data));
            document.getElementById('username').value='';
            document.getElementById('password').value='';
            document.getElementById('confirmationPassowrd').value='';
        } catch (error) {
            setMessage('Invalid username or password');
        }
    }

    const handleLogout = () => {
        setMessage("wylogowano");
        setToken("");
        setState("default");
        setUsername("");
        setPassword("");
    }

    const renderContentBasedOnState = () => {
        switch (state) {
            case "logged in":
                return (
                <div id='buttons'>
                    <button onClick={handleProtectedRequest}>Get Protected Data</button>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </div>)
            case "registering":
                return (
                    <>
                    <h1>Zarejestruj się</h1>
                    <form>
                        <label>Username: </label>
                        <input id='username' type="text" onChange={(e) => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input id='password' type="password" onChange={(e) => setPassword(e.target.value)} />
                        <label>Potwierdź hasło: </label>
                        <input id='confirmationPassword' type="password" onChange={(e) => setConfirmationPassword(e.target.value)} />
                    </form>
                    <div id='buttons'>
                    <button onClick={handleRegister}>Zarejestruj się</button>
                    <button onClick={() => setState("default")}>Powrót</button>
                    </div>
                    </>
                )
            case "default":
                return (
                    <>
                    <h1>Zaloguj się</h1>
                    <form>
                        <label>Username: </label>
                        <input id='username' type="text" onChange={(e) => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input id='password' type="password" onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <div id='buttons'>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setState("registering")}>Zarejestruj się</button>
                    </div>
                </>
                )
        }
    }

    return (
        <div className="zad5">
            {renderContentBasedOnState()}
            <>
            <p>{message}</p>
            </>
        </div>
    );
}

export default App;