import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Label from './Label';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD.MM.YYYY'),
      time: moment().format('HH:mm:ss')
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment().format('DD.MM.YYYY'),
      time: moment().format('HH:mm:ss')
    });
  }

  render() {
    const {
      headerTitle,
    } = this.props;
    return (
      <div className="header">
        <div className="header-title">
          <ion-icon name='bus'/>
          <Label first={headerTitle}/>
        </div>
        <div>
          <span className="header-date">
            {this.state.date}
          </span>
          <span className="header-clock">
            {this.state.time}
          </span>
        </div>
      </div>
    )
  };
}

Header.deafultProps = {
  headerTitle: '',
};

Header.propTypes = {
  headerTitle: PropTypes.string,
};

export default Header;
