import './Login.css';
import { useRef, useState, useEffect } from 'react';
import { doLogin  } from '../api';

export default function Login({ setLoggedIn }) {
    const [error, setError] = useState('');
    const usernameRef = useRef('');
    const passwordRef = useRef('');

    useEffect(() => {
        document.title = 'Login | ChatGPT App';
        setError('');
    }, []);

    const handleLogin = () => {
        setError('');
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        doLogin(data).then(res => {
            if(res.error) {
                return setError(res.error);
            }
            localStorage.setItem('token', res.token);
            setLoggedIn(true);
        });
    };

    return (
        <div className="login-wrap">
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="mb-2">Username</label>
                    <input type="text" ref={usernameRef} className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input type="password" ref={passwordRef} className="form-control" />
                </div>
                <div>
                    <button onClick={handleLogin} type="button" className="btn btn-primary btn-block w-100">
                        Login
                    </button>
                    {error && <div className="alert alert-danger mt-4">{error}</div> }
                </div>
            </form>
        </div>
    )
}