import memjs from 'memjs';
const serverHost = process.env.MEMCACHED_HOST || 'localhost';
const serverPort = process.env.MEMCACHED_PORT || 11211;
const client = `${serverHost}:${serverPort}`;
const options = {};

class MemCached {
    private client: memjs.Client;
    
    constructor() {
        this.client = memjs.Client.create(client, options);
    }
    
    public get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err: any, val: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(val);
                }
            });
        });
    }
    
    public set(key: string, value: any, expires: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, { expires }, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }
    
    public del(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.delete(key, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

export default MemCached;