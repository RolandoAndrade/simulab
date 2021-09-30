export function getColor(color: string) {
    const colors = {
        "Teal": "#6df5bc",
        "Cyan": "#6fbfda",
        "Blue": "#2340ce",
        "Yellow": "#e8de6b",
        "Red": "#ea3636",
        "Green": "green"
    }
    return colors[color] || color
}