import { useState } from "react";
import api from "../application/api.js"

const LoginPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const createAccount = async (e) => {
        e.preventDefault();
        let data = { firstName, lastName, email, phone, password };
        let response = await api.createAccountAsync(data);
        if (response) {
            alert("Account was created!");
        }
        else {
            alert("Account was not created!");
        }
    }

    const login = async (e) => {
        e.preventDefault();
        let data = { email, password };
        let response = await api.loginUserAsync(data);
        console.log(response);
        sessionStorage.setItem("token", response.token);
        let apiUrl = import.meta.env.VITE_API_URL;
        if (response) {
            alert("Login was successful!");
            //TODO navigate to home-page OR Admin-page depending on role
            let user = await fetch(apiUrl + `/guests/admin/dashboard`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${response.token}`,
                    "Content-Type": "application/json"
                },
            });
            let json = await user.json();
            console.log(json);
        }
        else {
            alert("Login was not successful!");
        }
    }

    return (
        <>
            <h1>Log in or create an account</h1>
            <section>
                <article>
                    <h2>Log in</h2>
                    <form onSubmit={(e) => login(e)}>
                        <fieldset>
                            <div className="column">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="email@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="column">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="supersecret" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit">Log in</button>
                        </fieldset>
                    </form>
                </article>
                <article>
                    <h2>Create Account</h2>
                    <form onSubmit={(e) => createAccount(e)}>
                        <fieldset>
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" name="firstName" id="firstName" placeholder="First Name" required autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="column">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} placeholder="email@domain.com" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" value={password} placeholder="supersecret" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="column">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" name="phone" id="phone" value={phone} placeholder="+4670456789" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit">Create Account</button>
                        </fieldset>
                    </form>
                </article>
            </section>
        </>

    )
}

export default LoginPage