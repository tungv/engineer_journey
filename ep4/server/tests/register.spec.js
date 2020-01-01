const withExecute = require("./withExecute");

describe("register", () => {
  it("should return registered user", () => {
    return withExecute(async execute => {
      const { errors, data } = await execute(/* GraphQL */ `
        mutation {
          register(name: "tung") {
            id
            name
          }
        }
      `);

      expect(errors).toBeUndefined();

      expect(data.register).toEqual({
        id: expect.any(String),
        name: "tung",
      });
    });
  });
});
