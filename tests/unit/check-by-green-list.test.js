const checkByGreenList = require("../../src/utils/check-by-green-list");
const structuredClone = require("../utils/structured-clone");

describe("checkByGreenList", () => {
    test("returns true if greenList contains all params keys", () => {
        const greenList = { param1: true, param2: true };

        expect(checkByGreenList({ param1: "val1" }, greenList)).toBe(true);

        expect(checkByGreenList({ param1: "val1", param2: "val2" }, greenList)).toBe(true);
    });

    test("returns false if greenList doesn't contain all params keys", () => {
        const greenList = { param1: true };

        expect(checkByGreenList({ param1: "val1", param2: "val2" }, greenList)).toBe(false);
    });

    test("does not mutate the input", () => {
        const params = { param1: "val1", param2: "val2" };
        const paramsCopy = structuredClone(params);
        const greenList = { param1: true, param2: true };
        const greenListCopy = structuredClone(greenList);

        checkByGreenList(params, greenList);

        expect(params).toEqual(paramsCopy);
        expect(greenList).toEqual(greenListCopy);
    });
});
