import React, { useState } from 'react';
import axios from 'axios';

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
            setMessage('');
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

    return (
        <div className="App">
            {!loggedIn ? (
                <>
                <h1>Zaloguj się</h1>
                <div>
                    <label>Username: </label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                <button onClick={handleProtectedRequest}>Get Protected Data</button>
                <p>{message}</p>
                </>
            )}
            

        </div>
    );
}

export default App;