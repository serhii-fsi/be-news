const structuredClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

module.exports = structuredClone;
