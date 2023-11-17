const axios = require('axios');

const {NGROK_PORT, LOCAL_URL} = process.env;

class Ngrok { 
    constructor(localUrl, ngrokPort){
        this.url = localUrl;
        this.port = ngrokPort;
    }

    async getUrl(){
        try{
            const {data} = await axios.get(`${this.url}:${this.port}/api/tunnels`);
            console.log(data);
            return data?.tunnels?.find((object) => object.proto === 'https')?.public_url;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Ngrok(LOCAL_URL, NGROK_PORT)