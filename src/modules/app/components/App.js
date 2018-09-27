import React from 'react';
import Header from './Header';
import ArrivalTable from './ArrivalTable';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = (props) => {
  if (!props.data) return null;

  const { loading, error, stopPlace } = props.data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Header headerTitle={stopPlace.name} />
      <ArrivalTable items={stopPlace.estimatedCalls}/>
    </div>
  )
};

const withDataQuery = graphql(
  gql`
    {
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
    }
  `,
  {
    options: { pollInterval: 5000 },
  }
);

export default withDataQuery(App);
