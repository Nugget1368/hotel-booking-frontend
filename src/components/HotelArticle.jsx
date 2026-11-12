import Card from "./Card"

export default function HotelArticle(props) {
    const { hotel, children } = props;
    return (
        <Card as="article" className="card--wide">
            <div className="card__main">
                <div className="card__image">
                    {hotel.img && hotel.img !== "" ?
                        <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                        :
                        <img src="https://via.placeholder.com/150" alt={hotel.name} />}
                </div>
                <div className="card__hotel-info">
                    <header>
                        <h3>{hotel.name}</h3>
                    </header>
                    <div className="card__description">
                        <div>
                            <p>{hotel.city}, {hotel.country} </p>
                            <p>{hotel.adress ? hotel.adress : ""}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card__content">
                {children &&
                    <div className="card__actions">
                        {children}
                    </div>}
            </div>
        </Card>
    )
}
