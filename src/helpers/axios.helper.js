const axios = require("axios");
const FormData = require('form-data');

const {STREAMING_LOGIN, STREAMING_PASSWORD} = process.env;

exports.constructPostBody = async (chatId, urls) => {
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;

    const media = urls.map((url, index) => ({
        type: 'photo',
        media: `attach://image${index + 1}.jpg`,
        caption: `${url.match(ipAddressRegex)} ${new Date().toLocaleString('uk-UA', {timeZone: 'Europe/Kiev'})}`,
    }));
  
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('media', JSON.stringify(media));

    for (let i = 0; i < urls.length; i++) {
        let response;
        
        const regex = /\/\/(.*?):(.*?)@/;
        const match = urls[i].match(regex)

        response = await  axios.get(urls[i], {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/jpeg; charset=UTF-8',
            },

            auth: {
                username: match[1],
                password: match[2],
            },
        });

        if (!response || response.status !== 200) {
            throw new Error(`Failed to retrieve image ${i + 1} from ${urls[i]} check IP and credentials`);
        }

        const imageBuffer = Buffer.from(response.data, 'binary');

        formData.append(`image${i + 1}.jpg`, imageBuffer, {
            filename: `image${i + 1}.jpg`,
        });
    }

    return { 
        body: formData, 
        headers: { ...formData.getHeaders(), } 
    } ;
};