export const cacheData = (key, data) => {
    try {
        console.log('Caching data to localStorage...');
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('Error caching data to localStorage: ', error);
    }
}


export function getCachedData(key) {
    try {
        console.log('Getting data from localStorage...');

        const data = localStorage.getItem(key);
        if (data && (data.startsWith("{") || data.startsWith("["))) {
            return JSON.parse(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
}


export const clearCache = (key) => {
    localStorage.removeItem(key);
}