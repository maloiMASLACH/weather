import GetInfo from "../data/storage";
jest.mock
describe("Storage", () => {
  test("Correct info list", async () => {
    const expected = await new GetInfo().getWhatINeed("Minsk");
    expect(expected).toBe(1);
  });
});
