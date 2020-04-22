import React from 'react';
import ParseItem from './ParseItem';

export default class ParseItems extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {this.props.parseItems.map((p) => <ParseItem key={p.id} attributes={p} />)}
      </div>
    );
  }
}