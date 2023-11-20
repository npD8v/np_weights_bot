const axios = require('axios');

const {NGROK_PORT, LOCAL_URL} = process.env;

class Ngrok { 
    constructor(localUrl, ngrokPort){
        this.url = localUrl;
        this.port = ngrokPort;
    }

    async getUrl(){
        const {data} = await axios.get(`${this.url}:${this.port}/api/tunnels`);
        return data.tunnels.find((object) => object.proto === 'https').public_url;
    }
}

module.exports = new Ngrok(LOCAL_URL, NGROK_PORT)