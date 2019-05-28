import React, { PureComponent, Fragment } from "react";

class Tune extends PureComponent {

  render() {
    return (
      <Fragment>
        <img src={this.props.tune.artworkUrl100} alt={this.props.tune.name} />
        <div className="txt-wrap">
          <p>{this.props.tune.name}</p>
          <p>{this.props.tune.artistName}</p>
        </div>
      </Fragment>
    );
  }
}

export default Tune;
