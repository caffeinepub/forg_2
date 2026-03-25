actor {
  type MemeCoin = {
    name : Text;
    symbol : Text;
    decimals : Nat8;
    contractAddress : Text;
  };

  let memeCoin : MemeCoin = {
    name = "MemeCoin";
    symbol = "MEME";
    decimals = 18;
    contractAddress = "8db3c2382d169dcda88548152d1e4c8fe94759c5";
  };

  stable var pfpCount : Nat = 0;

  public query ({ caller }) func getMemeCoin() : async MemeCoin {
    memeCoin;
  };

  public func incrementPfpCount() : async Nat {
    pfpCount += 1;
    pfpCount;
  };

  public query func getPfpCount() : async Nat {
    pfpCount;
  };
};
