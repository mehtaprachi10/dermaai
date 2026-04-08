import Types "../types/analysis";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type AnalysisStore = Map.Map<Principal, List.List<Types.AnalysisRecord>>;
  public type ConsentStore = Map.Map<Principal, Types.ConsentRecord>;

  let MAX_ANALYSES : Nat = 20;

  /// Save an analysis record for the given principal. Trims to last 20 per user.
  public func saveAnalysis(
    store : AnalysisStore,
    caller : Principal,
    record : Types.AnalysisRecord,
  ) : Text {
    let userList = switch (store.get(caller)) {
      case (?existing) existing;
      case null {
        let newList = List.empty<Types.AnalysisRecord>();
        store.add(caller, newList);
        newList;
      };
    };
    userList.add(record);
    // Trim to last MAX_ANALYSES — keep only newest entries by truncating from front
    if (userList.size() > MAX_ANALYSES) {
      let overflow = userList.size() - MAX_ANALYSES;
      // Rebuild the list keeping only the last MAX_ANALYSES entries
      let kept = userList.sliceToArray(overflow, userList.size());
      userList.clear();
      for (r in kept.values()) {
        userList.add(r);
      };
    };
    record.analysisId;
  };

  /// Return all analyses for the given principal, newest first.
  public func getAnalyses(
    store : AnalysisStore,
    caller : Principal,
  ) : [Types.AnalysisRecord] {
    switch (store.get(caller)) {
      case null [];
      case (?userList) {
        let arr = userList.toArray();
        arr.reverse();
      };
    };
  };

  /// Return a specific analysis by ID, only if owned by caller.
  public func getAnalysis(
    store : AnalysisStore,
    caller : Principal,
    analysisId : Text,
  ) : ?Types.AnalysisRecord {
    switch (store.get(caller)) {
      case null null;
      case (?userList) {
        userList.find(func(r) { r.analysisId == analysisId });
      };
    };
  };

  /// Save consent record for the given principal.
  public func saveConsent(
    store : ConsentStore,
    caller : Principal,
    camera : Bool,
    location : Bool,
    dataUsage : Bool,
    timestamp : Int,
  ) : () {
    let record : Types.ConsentRecord = {
      camera;
      location;
      dataUsage;
      timestamp;
    };
    store.add(caller, record);
  };

  /// Return consent record for the given principal.
  public func getConsent(
    store : ConsentStore,
    caller : Principal,
  ) : ?Types.ConsentRecord {
    store.get(caller);
  };
};
