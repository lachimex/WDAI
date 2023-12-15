import React, { useState } from 'react';
import axios from 'axios';
import "./zad5.css"

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: username,
                password: password,
            });
            setToken(response.data.token);
            setLoggedIn(true);
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

    const handleLogout = () => {
        setMessage("wylogowano");
        setToken("");
        setLoggedIn(false);
        setUsername("");
        setPassword("");
    }

    return (
        <div className="zad5">
            {!loggedIn ? (
                <>
                    <h1>Zaloguj się</h1>
                    <form>
                        <label>Username: </label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                    <button onClick={handleProtectedRequest}>Get Protected Data</button>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </>
            )}
            <>
            <p>{message}</p>
            </>
        </div>
    );
}

export default App;