const axios = require('axios');

const {TELEGRAM_TOKEN, BOT_API_URL} = process.env;

class TelegramBotApi{
    constructor(token, botApiUrl) {
        this.token = token;
        this.botApiUrl = botApiUrl;
    }
    async callAPI(methodName, body, headers = {}) {
        try {
            const url = `${this.botApiUrl}${this.token}/${methodName}`;
            const result = await axios.post(url, body, headers );
            return result;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new TelegramBotApi(TELEGRAM_TOKEN, BOT_API_URL);