const telegramHelper = require('../helpers/telegram.helper');

class TelegramService {
    async setWebhook(url) {
        return telegramHelper.callAPI('setWebhook', { url });    
    }
    async invokeKeyboardMenu(chat_id, { text, keyboard }) { 
        return telegramHelper.callAPI('sendMessage', {
        chat_id,
        text,
        reply_markup: {
            keyboard,
            resize_keyboard: true,
            one_time_keyboard: false,
            force_reply: true,
        }
    });
  }

  async sendMessageWithPictures(body, headers) {
    return telegramHelper.callAPI('sendMediaGroup', body, headers);
  }

  async sendMessage(chat_id,  text) { 
        return telegramHelper.callAPI('sendMessage', {
        chat_id,
        text,
    });
  }
  
  async deleteMessage(chat_id,  message_id) { 
    return telegramHelper.callAPI('deleteMessage', {
    chat_id,
    message_id,
});
}
}
module.exports = new TelegramService();