import React from "react"
import '../styling/_card.scss'

const Card = ({ as = "article", children, className = "", ...props }) =>
    React.createElement(as, { className: `card ${className}`.trim(), ...props }, children)

export default Card
