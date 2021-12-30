var HeroFactory = artifacts.require("./HeroFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(HeroFactory);
};
