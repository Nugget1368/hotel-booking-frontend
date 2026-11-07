import { Link } from "react-router"
import Card from "./Card"

const HotelArticle = ({ hotel }) => (
    <Card as="article" className="card">
        <div className="column img-container" style={{ width: "100%" }}>
            {hotel.img && hotel.img !== "" ?
                <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                :
                <img src="https://via.placeholder.com/150" alt={hotel.name} />}
        </div>
        <div className="column">
            <h2>{hotel.name}</h2>
            <p>Address: {hotel.address}</p>
        </div>
        <div className="row">
            <p>{hotel.city}</p>
            <p>{hotel.country}</p>
        </div>
        <div className="column">
            <p>Phone: {hotel.phone}</p>
            <p>Email: {hotel.email}</p>
        </div>
        <Link className="primary" to={`/booking?hotelId=${hotel.id}`}>Book This</Link>
    </Card>
)

export default HotelArticle
