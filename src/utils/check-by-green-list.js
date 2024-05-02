/**
 * Every key in the params should also be in the greenList, than returns true
 * @param {object} params
 * @param {object} greenList
 * @returns boolean
 */
const checkByGreenList = (params, greenList) => {
    return Object.keys(params).every((key) => {
        if (greenList[key]) return true;
        else return false;
    });
};

module.exports = checkByGreenList;
