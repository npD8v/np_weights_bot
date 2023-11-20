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
        const messageText = `Щоб розпочати роботу з ботом - натисніть на кнопку з номером вагового терміналу стан якого ви бажаєте перевірити.`;
        try {
            await telegramService.invokeKeyboardMenu(chatId, {
                text: messageText,
                keyboard: [
                    [{ text: "Вагова 1" }, { text: "Вагова 2" }],
                    [{ text: "Вагова 3" }, { text: "Вагова 4" }]
                ],
            })
            await telegramService.deleteMessage(chatId, message.message_id);
        } catch (err) {
            await telegramService.sendMessage(chatId, err.message);
        }
    }

    async deleteMessage(chatId, messageId){
        try {
            await telegramService.deleteMessage(chatId, messageId);
        } catch (error) {
            
        }
    }

    async sendWeightState(req, res, next) {
        const { message } = req?.body;
        const chatId = message?.chat?.id;

        const weightIdentifier = `weight${message.text.split(' ')[1]}`;

        const messageMapper = {
            weight1: 'Вагова 1 (Перший двір)',
            weight2: 'Вагова 2 (Центральна права)',
            weight3: 'Вагова 3 (Центральна ліва)',
            weight4: 'Вагова 4 (Рендеринг)'
        };


        try{
            const {body, headers} = await constructPostBody(chatId, snapshotsMapper[weightIdentifier]);
            await telegramService.sendMessageWithPictures(body, headers);
            await telegramService.sendMessage(chatId, `${messageMapper[weightIdentifier]}`);
            await telegramService.deleteMessage(chatId, message.message_id);
        } catch (err) {
            await telegramService.sendMessage(chatId, err.message);
        }
    }
}

module.exports = new TelegramController();
