import { redisClient } from "./connection";


const setCache = async(key:string, data:string, EX:number) => {
    try {
        await redisClient.set(key, data, {EX});
        console.log('Redsi set cache', key , "value:", data)
    } catch (error) {
        console.log('Error while seeting redis data:', error);
        throw error;
    }
}


const getCache = async(key:string) => {
     try {
       const value =  await redisClient.get(key);
        console.log('Redsi get cache', key , "value:", value)
    } catch (error) {
        console.log('Error while geeting redis data:', error);
        throw error;
    }
}

export { getCache, setCache}