import { useId, useState } from "react"

const Slider = ({ label, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const contentId = useId()

    return (
        <div>
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "Hide" : "Show"} {label}
            </button>
            {isOpen && <div id={contentId}>{children}</div>}
        </div>
    )
}

export default Slider
