import CardLong from "../CardLong"
import { useState } from "react";
import Api from "../../application/api.js"

export default function ReservationItem(props) {
  const { reservation, reservationList, setReservationsList } = props;
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    roomType: reservation.roomType,
    checkIn: reservation.checkIn,
    checkOut: reservation.checkOut
  });
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditData({
      roomType: reservation.roomType,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut
    });
  }

  const deleteReservation = async (id) => {
    let result = await Api.deleteReservationAsync(id);
    if (result.success) {
      let newList = reservationList.filter((reservation) => reservation.reservationId !== id);
      setReservationsList(newList);
    }
    else {
      alert("Could not delete reservation.");
    }
  }

  const editReservation = async (reservation) => {
    Object.keys(editData).forEach(key => {
      if (editData[key] === "")
        editData[key] = reservation[key];
    })
    let id = reservation.reservationId;
    let result = await Api.editReservationAsync(id, editData);
    if (result.success) {
      let newList = reservationList.map((r) => r.reservationId === id ? result.reservation : r);
      setReservationsList(newList);
      toggleEditMode(null);
    }
    else {
      alert("Could not edit reservation.");
    }
  }

  return (
    <CardLong as="li">
      <div>
        <h3>{reservation.firstName} {reservation.lastName}</h3>
        {editMode ?
          <p><strong>Room Type:</strong> <input type="text" placeholder={reservation.roomType} defaultValue={reservation.roomType} onChange={(e) => setEditData((data) => ({ ...data, roomType: e.target.value }))} /></p>
          :
          <p><strong>Room Type:</strong> {reservation.roomType}</p>
        }
        {editMode ?
          <>
            <p><strong>Check In:</strong> <input type="date" defaultValue={reservation.checkIn} placeholder={reservation.checkIn} onChange={(e) => setEditData((data) => ({ ...data, checkIn: e.target.value }))} /></p>
            <p><strong>Check Out:</strong> <input type="date" defaultValue={reservation.checkOut} placeholder={reservation.checkOut} onChange={(e) => setEditData((data) => ({ ...data, checkOut: e.target.value }))} /></p>
          </>
          :
          <p><strong>Check In:</strong> {reservation.checkIn} | <strong>Check Out:</strong> {reservation.checkOut}</p>
        }
      </div>
      <div className="btn-container">
        {editMode ?
          <>
            <button className="btn primary" onClick={() => editReservation(reservation)}>Save</button>
            <button className="btn secondary" onClick={() => toggleEditMode(null)}>Cancel</button>
          </>
          :
          <>
            <button className="btn secondary" onClick={() => toggleEditMode(reservation.reservationId)}>Edit</button>
            <button className="btn danger" onClick={() => deleteReservation(reservation.reservationId)}>Delete</button>
          </>
        }
      </div>
    </CardLong>
  )
}

