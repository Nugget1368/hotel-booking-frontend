import CardLong from "../CardLong"
import { useState } from "react";
import Api from "../../application/api.js"
import { useDispatch, useSelector } from "react-redux";
import { removeReservation, updateReservation } from "../../store/reservationSlice.js";

export default function ReservationItem(props) {
  const { reservation } = props;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.guests.guestCurrent.token);

  const [editData, setEditData] = useState({
    roomType: reservation.roomType ?? "",
    checkIn: reservation.checkIn?.split("T")[0] ?? "",
    checkOut: reservation.checkOut?.split("T")[0] ?? ""
  });
  const toggleEditMode = (editing) => {
    setEditMode(editing);
    setEditData({
      roomType: reservation.roomType ?? "",
      checkIn: reservation.checkIn?.split("T")[0] ?? "",
      checkOut: reservation.checkOut?.split("T")[0] ?? ""
    });
  }

  const deleteReservation = async (id) => {
    let result = await Api.deleteReservationAsync(id, token);
    if (result.success) {
      dispatch(removeReservation(id));
    }
    else {
      alert("Could not delete reservation.");
    }
  }

  const editReservation = async (reservation) => {
    let id = reservation.reservationId;
    const updatedData = {
      ...editData,
      roomType: editData.roomType || reservation.roomType,
      checkIn: editData.checkIn || reservation.checkIn,
      checkOut: editData.checkOut || reservation.checkOut
    };
    let result = await Api.editReservationAsync(id, updatedData, token);
    if (result.success) {
      dispatch(updateReservation(result.reservation ?? { ...reservation, ...updatedData }));
      setEditMode(false);
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
          <p><strong>Room Type:</strong> <input type="text" value={editData.roomType} onChange={(e) => setEditData((data) => ({ ...data, roomType: e.target.value }))} /></p>
          :
          <p><strong>Room Type:</strong> {reservation.roomType}</p>
        }
        {editMode ?
          <div className="row row--left">
            <p><strong>Check In:</strong> <input type="date" value={editData.checkIn} onChange={(e) => setEditData((data) => ({ ...data, checkIn: e.target.value }))} /></p>
            <p><strong>Check Out:</strong> <input type="date" value={editData.checkOut} onChange={(e) => setEditData((data) => ({ ...data, checkOut: e.target.value }))} /></p>
          </div>
          :
          <p><strong>Check In:</strong> {reservation.checkIn} | <strong>Check Out:</strong> {reservation.checkOut}</p>
        }
      </div>
      <div className="card__actions">
        {editMode ?
          <>
            <button className="btn btn--primary" onClick={() => editReservation(reservation)}>Save</button>
            <button className="btn btn--secondary" onClick={() => toggleEditMode(false)}>Cancel</button>
          </>
          :
          <>
            <button className="btn btn--secondary" onClick={() => toggleEditMode(true)}>Edit</button>
            <button className="btn btn--danger" onClick={() => deleteReservation(reservation.reservationId)}>Delete</button>
          </>
        }
      </div>
    </CardLong>
  )
}

