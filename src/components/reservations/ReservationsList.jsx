import React from 'react'
import Reservation from './Reservation'
import Card from '../Card'

const ReservationsList = ({ reservations }) => {
    return (
        <ul>
            {reservations && reservations.length > 0 ?
                reservations.map((reservation, index) => <Card as="li" key={index}><div className="column"><Reservation reservation={reservation} /></div></Card>) :
                <li>Det finns inga bokningar</li>
            }
        </ul>
    )
}

export default ReservationsList