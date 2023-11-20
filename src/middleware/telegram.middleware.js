const telegramController = require('../controllers/telegram.controller');
const {weights} = require('../helpers/const.helper');
const {multipleKeysValue} = require('../helpers/utils.helper');

const _controllersMap = {
  ...multipleKeysValue(weights, telegramController.sendWeightState),
  start: telegramController.invokeKeyboardMainMenu,
}

exports.callController = async (req, res, next) => {
  if(req.body.message){
    const key = req.body.message.text.replace('/', '').replace(' ', '_').toLowerCase();
    console.log('Current command: ', key)
    if(Object.keys(_controllersMap).includes(key)){
      await _controllersMap[key](req, res, next);
    } else {
      const chatId = req.body.message.chat_id;
      await telegramController.sendDecliningMessage(req, res,next)
    }
  }
  res.status(200).json({});
};
