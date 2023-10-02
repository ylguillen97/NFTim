const NFTim = artifacts.require("NFTim");

contract("NFTim", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await NFTim.deployed();
  });

  it("Name: checking the name is correct ", async () => {
    let name = await instance.name();
    assert.equal(name, "NFTim");
  });

  it("Symbol: checking the symbol is correct", async () => {
    let symbol = await instance.symbol();
    assert.equal(symbol, "TIM");
  });

  it("Mint: Trying to mint an identity from a different address than that of the owner", async () => {
    let name = "Juan Luis";
    let surname1 = "Gonzalez";
    let surname2 = "Romero";
    let addr = accounts[1];
    try {
      await instance.mint(name, surname1, surname2, addr, {
        from: accounts[1],
      });
    } catch (e) {
      assert(e.message.includes("Ownable: caller is not the owner"));
    }
  });

  it("Mint: Mint an identity from the owner's address", async () => {
    let name = "Juan Luis";
    let surname1 = "González";
    let surname2 = "Romero";
    let addr = accounts[1];

    await instance.mint(name, surname1, surname2, addr, {
      from: accounts[0],
    });

    assert.equal(await instance.ownerOf(1), accounts[1]);
  });

  it("Mint: Mint another identity from the owner's address to make sure that tokenIDs work", async () => {
    let name = "Juan Luis";
    let surname1 = "González";
    let surname2 = "Romero";
    let addr = accounts[1];

    let name2 = "Yolanda";
    let surname11 = "López";
    let surname22 = "Guillén";
    let addr2 = accounts[2];

    await instance.mint(name2, surname11, surname22, addr2, {
      from: accounts[0],
    });

    assert.equal(await instance.ownerOf(1), accounts[1]);

    assert.equal(await instance.ownerOf(2), accounts[2]);
  });

  it("Mint: Trying to mint an identity to an address that already has an identity", async () => {
    let name = "Juan Luis";
    let surname1 = "Gonzalez";
    let surname2 = "Romero";
    let addr = accounts[1];
    try {
      await instance.mint(name, surname1, surname2, addr, {
        from: accounts[0],
      });
    } catch (e) {
      assert(e.message.includes("This address already has an identity"));
    }
  });
});
