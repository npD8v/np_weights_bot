const telegramController = require('../controllers/telegram.controller');
const {weights} = require('../helpers/const.helper');
const {multipleKeysValue} = require('../helpers/utils.helper');

const _controllersMap = {
  ...multipleKeysValue(weights, telegramController.sendWeightState),
  start: telegramController.invokeKeyboardMainMenu,
}

exports.callController = async (req, res, next) => {
  const key = req?.body?.message?.text?.replace('/', '').replace(' ', '_').toLowerCase();
  console.log('Sent command: ', key)
  await _controllersMap[key]?.(req, res, next);
  res.status(200).json({});
};
