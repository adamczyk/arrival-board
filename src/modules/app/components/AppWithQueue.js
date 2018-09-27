import React, { Component } from 'react';
import Header from './Header';
import ArrivalTable from './ArrivalTable';
import { QUERY } from '../constants';

class AppWithQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopPlace: null,
      dataFetchRequested: false,
      dataFetchSucceeded: false,
      dataFetchFailed: false,
      queue: [], // Note! Queue could be completely omitted due to constant QUERY.
    };
  }

  componentDidMount() {
    this.fetchData(QUERY);

    // Simulate new query. Using constant but could potentially be a variable.
    this.queueTimerID = setInterval(
      () => this.fetchData(QUERY),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.queueTimerID);
  }

  fetchData(query) {
    if (this.state.dataFetchRequested) {
      this.state.queue.push(query);
    } else {
      this.fetch(query).then(res => {
        // Update data if succeeded
        if (this.state.dataFetchSucceeded) {
          this.setState({
            ...this.state,
            stopPlace: res.stopPlace,
          });
        }

        // TODO: Error could be handled here. Now it`s just ignored.

        // Query regardless of previous query status
        if (this.state.queue.length) {
          const newQuery = this.state.queue.pop();
          this.resetState();
          this.fetchData(newQuery);
        } else {
          this.resetState();
        }

      });
    }
    console.log('queue', this.state.queue);
  }

  resetState() {
    // Reset state
    this.setState({
      ...this.state,
      dataFetchRequested: false,
      dataFetchSucceeded: false,
      dataFetchFailed: false,
      queue: [],
    });
  }

  async fetch(query) {
    this.setState({
      ...this.state,
      dataFetchRequested: true,
    });

    return await fetch("https://api.entur.org/journeyplanner/2.0/index/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ET-Client-Name": "test"
      },
      body: JSON.stringify({
        query: query
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        ...this.state,
        dataFetchSucceeded: true,
      });

      return res.data;
    })
    .catch((err) => {
      this.setState({
        ...this.state,
        dataFetchFailed: true,
      });

      return err;
    });

  }

  render() {
    const {
      stopPlace,
    } = this.state;

    if (stopPlace === null) return <p>Loading...</p>;

    return (
      <div>
        <Header headerTitle={stopPlace.name} />
        <ArrivalTable items={stopPlace.estimatedCalls}/>
      </div>
    )
  };
}

AppWithQueue.deafultProps = {
};

AppWithQueue.propTypes = {
};

export default AppWithQueue;
