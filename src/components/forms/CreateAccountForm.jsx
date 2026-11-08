export default function CreateAccountForm(props) {
    const { formData, setFormData } = props

    return (
        <>
            <div className="row">
                <div className="column">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" required autoFocus value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="column">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
            </div>
            <div className="column">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="column">
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
        </>
    )
}