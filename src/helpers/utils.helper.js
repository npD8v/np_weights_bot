const {STREAMING_LOGIN, STREAMING_PASSWORD} = process.env;

exports.multipleKeysValue = (keys, value) => Object.fromEntries(keys.map(key => [key, value]))

exports.constructCamUrl = (ipAdress, login = STREAMING_LOGIN, password = STREAMING_PASSWORD) => `http://${login}:${password}@${ipAdress}/ISAPI/Streaming/channels/101/picture?snapShotImageType=JPEG`
      