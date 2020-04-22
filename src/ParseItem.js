import React from 'react';

export default class ParseItem extends React.Component {

  constructor(props){
    super(props)
    console.log(this.props.attributes);
  }

  render() {
    const {id, attributes} = this.props.attributes;
    let items = [];
    for (const a in attributes.data) {
      items.push(<li key={a} className="list-group list-group-flush">{`${a}: ${attributes.data[a]}`}</li>)
    }  
    return (
      <div className = "col-lg-6 col-md-6 col-xl-4">
        <div className="parse-item card mb-4 box-shadow h-250">
          <div className="card-header d-flex justify-content-between">
            {attributes.site_name}
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {items}
            </ul>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              {attributes.time_ago}
            </small>
          </div>
        </div>
      </div>
    );
  }
}