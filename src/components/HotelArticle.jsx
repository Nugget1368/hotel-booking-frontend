import Card from "./Card"

export default function HotelArticle(props) {
    const { hotel, children } = props;
    return (
        <Card as="article" className="card">
            <div className="column img-container" style={{ width: "100%" }}>
                {hotel.img && hotel.img !== "" ?
                    <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                    :
                    <img src="https://via.placeholder.com/150" alt={hotel.name} />}
            </div>
            <div>
                <h2>{hotel.name}</h2>
                <p>Address: {hotel.adress ? hotel.adress : "-"}</p>
                <p> {hotel.country}, {hotel.city}</p>
            </div>
            <div>
                <p><strong>Phone:</strong> {hotel.phone}</p>
                <p><strong>Email:</strong> {hotel.email}</p>
            </div>
            {children &&
                <div className="btn-container">
                    {children}
                </div>}
        </Card>
    )
}
