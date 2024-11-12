export const formatDate = (time) => {
    const date = new Date(time * 1000);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${date.toLocaleString('default', { weekday: 'short' })} ${month} ${day} ${year} ${hours}:${minutes}`;
    return formattedDate;
}