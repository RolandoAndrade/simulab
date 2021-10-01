export function getColor(color: string) {
    const colors = {
        "Teal": "#6df5bc",
        "Cyan": "#6fbfda",
        "Blue": "#00247D",
        "Yellow": "#FFCC00",
        "Red": "#CF142B",
        "Green": "green"
    }
    return colors[color] || color
}