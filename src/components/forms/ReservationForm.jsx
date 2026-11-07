export default function ReservationForm({ data }) {
    const { roomType, setRoomType, checkIn, setCheckIn, checkOut, setCheckOut } = data

    return (
        <>
            <div className="column">
                <label htmlFor="roomType">Room Type</label>
                <select name="roomType" id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
            </div>
            <div className="row">
                <div className="column">
                    <label htmlFor="checkIn">Check In</label>
                    <input type="date" name="checkIn" id="checkIn" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div className="column">
                    <label htmlFor="checkOut">Check Out</label>
                    <input type="date" name="checkOut" id="checkOut" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
            </div>
            <button type="submit">Submit</button>
        </>
    )
}
