import Types "../types/analysis";
import AnalysisLib "../lib/analysis";
import Time "mo:core/Time";

mixin (
  analysisStore : AnalysisLib.AnalysisStore,
  consentStore : AnalysisLib.ConsentStore,
) {
  /// Save a skin analysis record; returns the analysisId. Keeps only last 20 per user.
  public shared ({ caller }) func saveAnalysis(analysis : Types.AnalysisRecord) : async Text {
    AnalysisLib.saveAnalysis(analysisStore, caller, analysis);
  };

  /// Returns all analyses for the calling user, newest first.
  public shared query ({ caller }) func getAnalyses() : async [Types.AnalysisRecord] {
    AnalysisLib.getAnalyses(analysisStore, caller);
  };

  /// Returns a specific analysis by ID if owned by the caller.
  public shared query ({ caller }) func getAnalysis(analysisId : Text) : async ?Types.AnalysisRecord {
    AnalysisLib.getAnalysis(analysisStore, caller, analysisId);
  };

  /// Saves consent preferences for the calling user.
  public shared ({ caller }) func saveConsent(camera : Bool, location : Bool, dataUsage : Bool) : async () {
    let timestamp = Time.now();
    AnalysisLib.saveConsent(consentStore, caller, camera, location, dataUsage, timestamp);
  };

  /// Returns consent preferences for the calling user.
  public shared query ({ caller }) func getConsent() : async ?Types.ConsentRecord {
    AnalysisLib.getConsent(consentStore, caller);
  };
};
