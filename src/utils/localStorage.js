import localforage from 'localforage';

export const cacheData = async (key, data) => {
    try {
        console.log('Caching data to localforage...');
        await localforage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error caching data to localforage:', error);
    }
};

export const getCachedData = async (key) => {
    try {
        console.log('Getting data from localforage...');
        
        const data = await localforage.getItem(key);
        if (data && (typeof data === "string") && (data.startsWith("{") || data.startsWith("["))) {
            return JSON.parse(data);
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error retrieving data from localforage:', error);
        return null;
    }
};

export const clearCache = async (key) => {
    try {
        console.log('Clearing cache from localforage...');
        await localforage.removeItem(key);
    } catch (error) {
        console.error('Error clearing cache from localforage:', error);
    }
};
