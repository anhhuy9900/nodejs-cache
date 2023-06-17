import express from 'express';
import axios from 'axios';
import MemCached from '../../core/memcache/memcache';

const app = express.Router();
const cacheKey = "test-post-placeholder";

app.get("/test-post-placeholder", async (req, res) => {
    try {
        const cache = new MemCached();
        let data = await cache.get(cacheKey);
        console.log("🚀 ~ file: test-post-placeholder.ts ~ OLD DATA : ", data);
        if(!data) {
            const resData = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
            data = resData.data;
            await cache.set(cacheKey, JSON.stringify(data), 60);
        }

        console.log("🚀 ~ file: test-post-placeholder.ts ~ NEW DATA: ", JSON.stringify(data[0], null, 2));
        try {
            data = JSON.stringify(JSON.parse(data), null, 2);
        } catch (error) {

        }
        res.header("Content-Type",'application/json');
        res.status(200).send(data);	
    } catch(err: any) {
        res.status(500).send({message: err.message});
    }
});

app.get("/del-post-placeholder", async (req, res) => {
    try {
        const cache = new MemCached();
        await cache.del(cacheKey);
        let data = await cache.get(cacheKey);
        console.log("🚀 ~ DELETED POST PLACEHOLDER ~ data", data);
        res.setHeader("Content-Type", "text/plain");
        if(!data) {
            res.status(200).send("DELETED POST PLACEHOLDER SUCCESSFULLY");
        }
        res.status(200).send("DELETED POST PLACEHOLDER FAILED");	
    } catch(err: any) {
        res.status(500).send({message: err.message});
    }
});

export default app;