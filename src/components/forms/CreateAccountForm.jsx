export default function CreateAccountForm(props) {
    const { formData, setFormData } = props

    return (
        <div className="form-fields">
            <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" autoComplete="given-name" required autoFocus value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </div>
            <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" autoComplete="family-name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
        </div>
    )
}
