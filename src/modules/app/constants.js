export const QUERY = `{
  stopPlace(id: "NSR:StopPlace:4000") {
    id
    name  
    estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {     
      realtime
      aimedArrivalTime
      expectedArrivalTime
      date
      destinationDisplay {
        frontText
      }
    }
  }
}`;
