import Card from "./Card"
import CardLong from "./CardLong"

export default function HotelArticle(props) {
    const { hotel, children } = props;
    return (
        <Card as="article" className="card">
            <div className="main-content">
                <div className="img-container">
                    {hotel.img && hotel.img !== "" ?
                        <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                        :
                        <img src="https://via.placeholder.com/150" alt={hotel.name} />}
                </div>
                <div className="hotel-info">
                    <header>
                        <h2>{hotel.name}</h2>
                    </header>
                    <div className="description">
                        <div>
                            <p>Address: {hotel.adress ? hotel.adress : "-"} {hotel.city}, {hotel.country} </p>
                            <div className="contact">
                                <p><strong>Email:</strong> {hotel.email}</p>
                                <p><strong>Phone:</strong> {hotel.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="child-content">
                {children &&
                    <div className="btn-container">
                        {children}
                    </div>}
            </div>
        </Card>
    )
}
