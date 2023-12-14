const telegramService = require('../services/telegram.service');
const { snapshotsMapper } = require('../helpers/const.helper');
const { constructPostBody } = require('../helpers/axios.helper');

class TelegramController {
    async invokeKeyboardMainMenu(req, res, next) {
        const { message } = req.body;
        const chatId = message.chat.id;
        const messageText = `Привіт👋 Я готовий до роботи!\n⬇Для початку оберіть ваговоий термінал з меню.⬇`;
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

    async sendDecliningMessage(req, res,next) {
        const { message } = req.body;
        const chatId = message.chat.id;
        const messageText = `Я покищо не знаю що таке "${message.text}"🤔\n⬇⬇⬇Спробуй обрати щось з меню⬇⬇⬇`;
        try {
            await telegramService.sendMessage(chatId, messageText);  
        } catch (err) {
            await telegramService.sendMessage(chatId, err.message);
            await telegramService.deleteMessage(chatId, message.message_id); 
        }
    }

    async deleteMessage(chatId, messageId){
        try {
            await telegramService.deleteMessage(chatId, messageId);
        } catch (error) {
            
        }
    }

    async sendWeightState(req, res, next) {
        const { message } = req.body;
        const chatId = message.chat.id;

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
