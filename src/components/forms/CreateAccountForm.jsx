export default function CreateAccountForm({ data }) {
    const { firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone } = data

    return (
        <>
            <div className="row">
                <div className="column">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" required autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="column">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>
            <div className="column">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="column">
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
        </>
    )
}