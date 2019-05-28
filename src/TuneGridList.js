import React, { PureComponent } from "react";
import Tune from "./TuneCard";

class TunesList extends PureComponent {
  render() {
    return (
      <div className="row">
        {this.props.tunesList.map((tune, index) => (
          <div key={index} className="column">
            <Tune tune={tune} />
          </div>
        ))}
      </div>
    );
  }
}

export default TunesList;
