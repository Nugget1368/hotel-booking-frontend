import React from "react"
import Card from "./Card"
import "../styling/_card-long.scss"

const CardLong = ({ className = "", ...props }) =>
    React.createElement(Card, { ...props, className: `card-long ${className}`.trim() })

export default CardLong
