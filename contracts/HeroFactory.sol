// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
import './Ownable.sol';


contract HeroFactory is Ownable {
   

   uint goldTokenPrice = 0.000001 ether ;     
   //100g token per sum 
   uint sumHeroPrice = 100; 
   uint numberDna = 10**5;
   uint rareChance = 65;
   uint epicChance = 95;
   uint baseAttackAndHp = 10; 

  event NewHeroCreated(uint heroId, uint heroDna, string rarerity, uint8 attack, uint8 hp, uint cooldownAttack);

  struct Hero {
    uint heroId;
    uint heroDna;
    string rarerity;
    uint8 attack;
    uint8 hp;
    uint cooldownAttack;
  }

  Hero[] public heroes;


//token money
//currently set to unlimited
  mapping(address => uint) goldTokenOwned ;

  mapping (uint => address ) heroToOwner ;
  mapping (address => uint ) ownerNumberHeroCount ;


  modifier onlyOwnerOf(uint _heroId) {
      require(heroToOwner[_heroId] ==  msg.sender);
      _;
  }


// create new Hero function;
  function createNewHero() public {
      require(goldTokenOwned[msg.sender] >= sumHeroPrice);
      goldTokenOwned[msg.sender] = goldTokenOwned[msg.sender] - sumHeroPrice;
      uint heroId = heroes.length + 1;
      uint randDna = randomDnaNumber();
      string memory rarerity = generatetHeroRareRity(rareChance,epicChance);
      uint8 attack = uint8(randomFromOneToNumber(baseAttackAndHp));
      uint8 hp = uint8(randomFromOneToNumber(baseAttackAndHp));

      //push hero to array[]
      heroes.push(Hero(heroId,randDna,rarerity,attack,hp,0));
      
      heroToOwner[heroId] = msg.sender;
      ownerNumberHeroCount[msg.sender]++;
      emit NewHeroCreated(heroId,randDna,rarerity,attack,hp,0);
  }
 


  function setHeroDna( uint heroId ,uint _newHeroDna) public onlyOwnerOf(heroId) {
    Hero storage myHero =  heroes[heroId];
    myHero.heroDna = _newHeroDna;
  }

  function randomDnaNumber() internal view returns (uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, heroes.length))) % numberDna;
  }

  function randomFromOneToNumber(uint _number) internal view returns (uint) {
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, heroes.length))) % _number; 
  }

  function generatetHeroRareRity(uint _rareChance , uint _epicChance) internal view returns (string memory) {
      uint rand = randomFromOneToNumber(100);
      if (rand >= _epicChance) {
          return "Epic";
      } else if (rand >= _rareChance && rand < _epicChance) {
          return "Rare";
      } else {
          return "Common";
      }
  }

  function buyGoldToken (uint _amount ) public payable {
      require(msg.value >= _amount * goldTokenPrice);
       goldTokenOwned[msg.sender] += _amount;
  }

  function getGoldTokenPrice() public view returns (uint) {
      return goldTokenPrice;
  }



  //Get all index heroes of owner to array to the frontend 
  function getHeroesByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerNumberHeroCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < heroes.length; i++) {
      if (heroToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

}
