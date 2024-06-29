import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css';

function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNavigation = () => {
        if (method === "login") {
            navigate("/register");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Todo App</h1>
                <h2>{name}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text"
                    required
                /> <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text"
                    required
                /> <br />
                <button type="submit" className="button">{name}</button>
                <button onClick={handleNavigation} className="button new">
                {method === "login" ? "Register" : "Login"}
            </button>
            </form>
            
        </div>
    );
}

export default Form;
