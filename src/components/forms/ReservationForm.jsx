export default function ReservationForm(props) {
    const { formData, setFormData } = props

    return (
        <>
            <div className="column">
                <label htmlFor="roomType">Room Type</label>
                <select name="roomType" id="roomType" value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})}>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
            </div>
            <div className="row">
                <div className="column">
                    <label htmlFor="checkIn">Check In</label>
                    <input type="date" name="checkIn" id="checkIn" value={formData.checkIn} onChange={(e) => setFormData({...formData, checkIn: e.target.value})} />
                </div>
                <div className="column">
                    <label htmlFor="checkOut">Check Out</label>
                    <input type="date" name="checkOut" id="checkOut" value={formData.checkOut} onChange={(e) => setFormData({...formData, checkOut: e.target.value})} />
                </div>
            </div>
            <button type="submit">Submit</button>
        </>
    )
}
