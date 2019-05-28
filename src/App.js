import React, { Component, Fragment } from "react";
import "./App.css";
import { getTunes } from "./DataService";
import TunesList from "./TuneGridList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      size: 15,
      tunesList: undefined,
      allTunes: undefined,
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    let res = await getTunes();
    let tunes = [...res.feed.results];
    this.setState({
      isLoading: false,
      tunesList: tunes.slice(0, this.state.size),
      allTunes: res.feed.results
    });
  }

  handleNext = () => {
    let pageNum = this.state.pageNum;
    if (pageNum * this.state.size >= this.state.allTunes.length) {
      pageNum = 1;
    }
    let allTunes = [...this.state.allTunes];
    let from = pageNum * this.state.size;
    let nextList = allTunes.slice(from, from + this.state.size);
    pageNum = pageNum + 1;
    this.setState({
      tunesList: nextList,
      pageNum: pageNum
    });
  };

  handlePrevious = () => {
    let pageNum = this.state.pageNum;
    if (pageNum === 0 || pageNum === 6) {
      pageNum = 5;
    }
    let allTunes = [...this.state.allTunes];
    let from = pageNum * (this.state.size - 1);
    pageNum = pageNum - 1;
    this.setState({
      tunesList: allTunes.slice(from, from + this.state.size),
      pageNum: pageNum
    });
  };

  render() {
    return (
      <div className="main-container">
        {this.state.isLoading && (
          <p className="loading">
            <span>Loading data... </span>
            <br />
            <span>Please wait</span>
          </p>
        )}
        <div className="container">
          {this.state.tunesList && (
            <Fragment>
              <h2> Apple Music New Releases for mm/dd/yyyy </h2>
              <TunesList tunesList={this.state.tunesList} />
              <div className="pagination">
                <button className="button" onClick={this.handlePrevious}>
                  Previous
                </button>
                <button className="button button-next" onClick={this.handleNext}>
                  Next
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
