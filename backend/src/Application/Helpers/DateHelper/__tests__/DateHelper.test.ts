import DateHelper from "../DateHelper";

describe("DateHelper", () => {
  describe("formatting a timestamp into a valid date string", () => {
    it('should format the timestamp to "DD/MM/YYYY" format', () => {
      const timestamp = 1625286000000;
      const formattedDate = DateHelper.format(timestamp);
      expect(formattedDate).toEqual("03/07/2021");
    });

    it("should prepend a leading zero to the day if it is a single-digit number", () => {
      const timestamp = 1625224800000;
      const formattedDate = DateHelper.format(timestamp);
      expect(formattedDate).toMatch(/^0\d\/\d{2}\/\d{4}$/);
    });
  });
});
