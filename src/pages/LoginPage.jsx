import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createGuest, getGuestRole, loginGuest } from "../store/guestSlice.js";
import LoginForm from "../components/forms/LoginForm.jsx";
import CreateAccountForm from "../components/forms/CreateAccountForm.jsx";
import Slider from "../components/Slider.jsx";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.guests);

    const createAccount = async (e) => {
        e.preventDefault();
        let data = { ...formData };
        ///TODO: Move this to backend
        Object.keys(data).forEach(key => data[key] === "" ? data[key] = null : data[key]);
        const action = await dispatch(createGuest(data));
        if (createGuest.fulfilled.match(action)) {
            alert("Account was created!");
        }
    }

    const login = async (e) => {
        e.preventDefault();
        let data = { email: formData.email, password: formData.password };
        const action = await dispatch(loginGuest(data));
        if (!loginGuest.fulfilled.match(action)) {
            return;
        }

        const roleAction = await dispatch(getGuestRole(action.payload.rows.token));
        navigate(
            getGuestRole.fulfilled.match(roleAction) && roleAction.payload.role === "admin"
                ? "/admin/dashboard"
                : "/"
        );
    }

    return (
        <>
            <section>
                {error && <p role="alert">{error}</p>}
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
                                <button type="submit" className="btn btn--primary" disabled={status === "pending"}>Log in</button>
                            </div>
                        </fieldset>
                    </form>
                </article>
                <article>
                    <Slider label="Don't have an account?" defaultOpen={false} align="center">
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
                                    <button type="submit" className="btn btn--primary" disabled={status === "pending"}>Create Account</button>
                                </div>
                            </fieldset>
                        </form>
                    </Slider>
                </article>
            </section>
        </>

    )
}

export default LoginPage