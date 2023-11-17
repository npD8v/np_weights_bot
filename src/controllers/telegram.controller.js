const axios = require("axios");
const FormData = require('form-data');

const telegramService = require('../services/telegram.service');
const { snapshotsMapper } = require('../helpers/const.helper');
const { constructPostBody, cleanDirectory } = require('../helpers/axios.helper');

const { IMAGES_FOLDER } = process.env;

class TelegramController {
    async invokeKeyboardMainMenu(req, res, next) {
        const { message } = req?.body;
        const chatId = message?.chat?.id;
        const messageText = `Lorem ipsum`;
        const buttonsText = {
            weight1: `weight1`,
            weight2: `weight2`,
            weight3: `weight3`,

        };
        try {
            await telegramService.invokeKeyboardMenu(chatId,
                {
                    text: messageText,
                    keyboard: [
                        [{ text: buttonsText.weight1 }, { text: buttonsText.weight2 }, { text: buttonsText.weight3 }],
                    ],
                })
        } catch (err) {
            next(err);
        }
    }


    async sendWeightState(req, res, next) {
        const { message } = req?.body;
        const chatId = message?.chat?.id;

       const {body, headers} = await constructPostBody(chatId, snapshotsMapper[message.text]);

        try{
            await telegramService.sendMessageWithPictures(body, headers);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TelegramController();
