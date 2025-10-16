
const Reservation = (props) => {
    let { firstName, lastName, roomType, checkIn, checkOut } = props.reservation;
    return (
        <>
            <h3>{firstName} {lastName}</h3>
            <p><strong>Room Type:</strong> {roomType}</p>
            <p><strong>Check In:</strong> {checkIn.split("T")[0]} | <strong>Check Out:</strong> {checkOut.split("T")[0]}</p>
        </>
    )
}

export default Reservation