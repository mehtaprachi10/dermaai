module {
  public type AnalysisRecord = {
    analysisId : Text;
    imageUrl : Text;
    symptoms : [Text];
    duration : Text;
    ageGroup : Text;
    predictedDisease : Text;
    confidence : Float;
    explanation : Text;
    causes : [Text];
    treatments : [Text];
    lifestyleTips : [Text];
    doctorAdvice : Text;
    timestamp : Int;
    userPrincipal : Principal;
  };

  public type ConsentRecord = {
    camera : Bool;
    location : Bool;
    dataUsage : Bool;
    timestamp : Int;
  };
};
