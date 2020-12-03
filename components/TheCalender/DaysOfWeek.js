import React, { Component } from 'react';

// Day of week names for use in date-picker heading
const dayOfWeekNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export default class DaysOfWeek extends Component {
  render() {
    return (
      <div className="daysOfWeek">
        { dayOfWeekNames.map((name, key) => <div key={key}>{name}</div>) }
      </div>
    );
  }
}
