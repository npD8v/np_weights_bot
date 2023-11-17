const { constructCamUrl } = require("./utils.helper");

const {
    WEIGHT1_CAM1,
    WEIGHT1_CAM2,
    WEIGHT1_CAM3,

    WEIGHT2_CAM1,
    WEIGHT2_CAM2,

    WEIGHT3_CAM1,
    WEIGHT3_CAM2,
} = process.env;

exports.snapshotsMapper = {
    weight1: [constructCamUrl(WEIGHT1_CAM1), constructCamUrl(WEIGHT1_CAM2), constructCamUrl(WEIGHT1_CAM3)],
    weight2: [constructCamUrl(WEIGHT2_CAM1), constructCamUrl(WEIGHT2_CAM2)],
    weight3: [constructCamUrl(WEIGHT3_CAM1), constructCamUrl(WEIGHT3_CAM2)],
}

