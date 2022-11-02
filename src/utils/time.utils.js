/**
 * Generates timestamp in a form of: 2022 November 2 12:00
 * @returns object {date: , time:}
 */
export const timeStamp = () => {
    const date = new Date()
    const time = date.toLocaleTimeString().slice(0, 5)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const months = [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
    ];
    return { date: `${year} ${months[month]} ${day}`, time: `${time}` }
}