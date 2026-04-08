import Types "types/analysis";
import AnalysisLib "lib/analysis";
import AnalysisApi "mixins/analysis-api";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let analysisStore : AnalysisLib.AnalysisStore = Map.empty<Principal, List.List<Types.AnalysisRecord>>();
  let consentStore : AnalysisLib.ConsentStore = Map.empty<Principal, Types.ConsentRecord>();

  include AnalysisApi(analysisStore, consentStore);
};
