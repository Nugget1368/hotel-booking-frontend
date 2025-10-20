import React from 'react'
import Reservation from './Reservation'

const ReservationsList = ({ reservations }) => {
    return (
        <ul>
            {reservations && reservations.length > 0 ?
                reservations.map((reservation, index) => <li  key={index} className="card"><div className="column"><Reservation reservation={reservation} /></div></li>) :
                <li>Det finns inga bokningar</li>
            }
        </ul>
    )
}

export default ReservationsList