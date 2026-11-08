import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../application/api.js"
import { MySessionStorage } from "../application/localStorage.js";
import LoginForm from "../components/forms/LoginForm.jsx";
import CreateAccountForm from "../components/forms/CreateAccountForm.jsx";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault();
        let data = { ...formData };
        ///TODO: Move this to backend
        Object.keys(data).forEach(key => data[key] === "" ? data[key] = null : data[key]);
        let response = await api.createAccountAsync(data);
        if (response.success) {
            alert("Account was created!");
        }
        else {
            alert("Account was not created!");
        }
    }

    const login = async (e) => {
        e.preventDefault();
        let data = { email: formData.email, password: formData.password };
        let response = await api.loginUserAsync(data);
        if (response.success) {
            MySessionStorage.setUserToken(response.rows.token);
            MySessionStorage.saveUserInfo(response.rows);
            let roleResponse = await api.getUserRoleAsync(response.rows.token);
            roleResponse.role === "admin" ? navigate("/admin/dashboard") : navigate("/");
        }
        else {
            alert("Login was not successful...");
        }
    }

    return (
        <>
            <header>
                <h2>Log in or create an account</h2>
            </header>
            <section>
                <article>
                    <header>
                        <h3>Log in</h3>
                    </header>
                    <form onSubmit={(e) => login(e)}>
                        <fieldset>
                            <LoginForm
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <div className="form-actions">
                                <button type="submit" className="btn primary">Log in</button>
                            </div>
                        </fieldset>
                    </form>
                </article>
                <article>
                    <header>
                        <h3>Create Account</h3>
                    </header>
                    <form onSubmit={(e) => createAccount(e)}>
                        <fieldset>
                            <CreateAccountForm
                                formData={formData}
                                setFormData={setFormData}
                            />
                            <div className="form-actions">
                                <button type="submit" className="btn primary">Create Account</button>
                            </div>
                        </fieldset>
                    </form>
                </article>
            </section>
        </>

    )
}

export default LoginPage