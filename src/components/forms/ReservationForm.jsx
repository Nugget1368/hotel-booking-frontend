
export default function ReservationForm(props) {
    const { formData, setFormData } = props

    return (
        <div className="form-fields form-fields--reservation">
            <div className="form-fields__field form-fields__field--full">
                <label htmlFor="roomType">Room Type</label>
                <select name="roomType" id="roomType" value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})}>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
            </div>
            <div className="form-fields__field">
                <label htmlFor="checkIn">Check In</label>
                <input type="date" name="checkIn" id="checkIn" value={formData.checkIn} onChange={(e) => setFormData({...formData, checkIn: e.target.value})} />
            </div>
            <div className="form-fields__field">
                <label htmlFor="checkOut">Check Out</label>
                <input type="date" name="checkOut" id="checkOut" value={formData.checkOut} onChange={(e) => setFormData({...formData, checkOut: e.target.value})} />
            </div>
            <div className="form-fields__actions form-actions">
                <button type="submit" className="btn btn--primary">Submit</button>
            </div>
        </div>
    )
}
