
export default function LoginForm(props) {
    const { formData, setFormData } = props;
    return (
        <div className="form-fields">
            <div className="form-fields__field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="email@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-fields__field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="supersecret" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
        </div>
    )
}
