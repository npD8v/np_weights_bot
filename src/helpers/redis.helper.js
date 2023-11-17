const Redis = require('ioredis');

const {REDIS_URL} = process.env;

class Redis {
    constructor(redisUrl){
        this.client = new Redis(redisUrl)
    }

    async setValue(name, value) {
        const currentValue = await this.client.get(name);
        if(currentValue !== value.toString()){
            await this.client.set(name, value.toString())
            return true;
        }
        return false;
    }

    async getValueFromCache(name) {
      return this.client.get(name);
  }

}

module.exports = new Redis(REDIS_URL)