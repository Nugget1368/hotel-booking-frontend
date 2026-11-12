import { useId, useState } from "react"

const Slider = ({ label, children, defaultOpen = false, showVisibilityToggle = false, align = "left" }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const contentId = useId()

    return (
        <>
            <div className="slider">
                <div className={`slider__toggle slider__toggle--${["left", "center", "right"].includes(align) ? align : "left"}`}>
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={() => setIsOpen((open) => !open)}
                        className="btn-link btn-link--primary"
                    >
                        {showVisibilityToggle === true ? isOpen ? "Hide" : "Show" : ""} {isOpen ? "Hide " + label : label}
                    </button>
                </div>
                {isOpen && <div id={contentId} className="slider__content">{children}</div>}
            </div>
        </>
    )
}

export default Slider
