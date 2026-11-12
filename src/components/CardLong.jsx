import React from "react"
import Card from "./Card"

const CardLong = ({ className = "", ...props }) =>
    React.createElement(Card, { ...props, className: `card--long ${className}`.trim() })

export default CardLong
