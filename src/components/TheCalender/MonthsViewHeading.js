import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from './utils/persian';
import { leftArrow, rightArrow } from './utils/assets';

export default class MonthsViewHeading extends Component {
  static propTypes = {
    year: PropTypes.object.isRequired,
    onNextYear: PropTypes.func.isRequired,
    onPrevYear: PropTypes.func.isRequired
  };

  render() {
    const { year } = this.props;

    return (
        <div className="heading">
        <span className="title">
          { persianNumber(year.format('jYYYY')) }
        </span>
          <button
            type="button"
            title="سال قبل"
            className="navButton prev"
            onClick={this.props.onPrevYear}
            dangerouslySetInnerHTML={rightArrow}
            />
          <button
            type="button"
            title="سال بعد"
            className="navButton next"
            onClick={this.props.onNextYear}
            dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
  }
}
