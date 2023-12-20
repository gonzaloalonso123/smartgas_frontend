import AsyncStorage from '@react-native-async-storage/async-storage';
const cache = new Map();

export const getCachedData = async (key) => {
  if (cache.has(key)) {
    return cache.get(key);
  } else {
    const data = await AsyncStorage.getItem(key);
    cache.set(key, data);
    console.log("data: " + data);
    return data;
  }
};

export const setCachedData = async (key, data) => {
  await AsyncStorage.setItem(key, data);
  cache.set(key, data);
};

export const removeCachedData = (key) => {
  AsyncStorage.removeItem(key);
  cache.delete(key);
};