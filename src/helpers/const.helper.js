const { constructCamUrl } = require("./utils.helper");


exports.weights = ['вагова_1', 'вагова_2', 'вагова_3', 'вагова_4'];

const {
    WEIGHT1_CAM1,
    WEIGHT1_CAM2,
    WEIGHT1_CAM3,

    WEIGHT2_CAM1,
    WEIGHT2_CAM2,
    WEIGHT2_CAM3,

    WEIGHT3_CAM1,
    WEIGHT3_CAM2,
    WEIGHT3_CAM3,

    WEIGHT4_CAM1,
    WEIGHT4_CAM2,

    STREAMING_LOGIN,
    STREAMING_PASSWORD_RENDERING
} = process.env;

exports.snapshotsMapper = {
    weight1: [constructCamUrl(WEIGHT1_CAM1), constructCamUrl(WEIGHT1_CAM2), constructCamUrl(WEIGHT1_CAM3)],
    weight2: [constructCamUrl(WEIGHT2_CAM1), constructCamUrl(WEIGHT2_CAM2), constructCamUrl(WEIGHT2_CAM3)],
    weight3: [constructCamUrl(WEIGHT3_CAM1), constructCamUrl(WEIGHT3_CAM2), constructCamUrl(WEIGHT3_CAM3)],
    weight4: [constructCamUrl(WEIGHT4_CAM1, STREAMING_LOGIN, STREAMING_PASSWORD_RENDERING), constructCamUrl(WEIGHT4_CAM2, STREAMING_LOGIN, STREAMING_PASSWORD_RENDERING)], 
}

