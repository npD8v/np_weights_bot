const axios = require("axios");
const FormData = require('form-data');

const {STREAMING_LOGIN, STREAMING_PASSWORD} = process.env;

exports.constructPostBody = async (chatId, urls) => {
    const media = urls.map((url, index) => ({
        type: 'photo',
        media: `attach://image${index + 1}.jpg`,
    }));
  
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('media', JSON.stringify(media));

    for (let i = 0; i < urls.length; i++) {
        const response = await  axios.get(urls[i], {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/jpeg; charset=UTF-8',
            },
            auth: {
                username: STREAMING_LOGIN,
                password: STREAMING_PASSWORD,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to retrieve image ${i + 1}: ${response.statusText}`);
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