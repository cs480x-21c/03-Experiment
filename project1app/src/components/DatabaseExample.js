import React, { Component } from 'react';
import axios from 'axios';

class DatabaseExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participantID: 0,
      trialNum: 0,
      viz: "",
      truePercent: 0,
      reportedPercent: 0,
      currentTrialData: [],
    };

    this.handlePIDChange = this.handlePIDChange.bind(this);
    this.handleTrialNumChange = this.handleTrialNumChange.bind(this);
    this.handleVizChange = this.handleVizChange.bind(this);
    this.handleTruePercentChange = this.handleTruePercentChange.bind(this);
    this.handleReportedPercentChange = this.handleReportedPercentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    //Responsive Sizing
    axios.get('https://karoad-psite-api.herokuapp.com/api/cs4802/project3/presonses') 
    .then(res => {
        console.log(res)
        this.setState({ currentTrialData:res.data.results,
                        participantID: res.data.results.length });
    })
  }

  //These handle when the data in the form changes
  handlePIDChange(event) {
    this.setState({participantID: event.target.value});
  }
  handleTrialNumChange(event) {
    this.setState({trialNum: event.target.value});
  }
  handleVizChange(event) {
    this.setState({viz: event.target.value});
  }
  handleTruePercentChange(event) {
    this.setState({truePercent: event.target.value});
  }
  handleReportedPercentChange(event) {
    this.setState({reportedPercent: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios({ //This is the call to add to the database
          method: 'post',
          url: 'https://karoad-psite-api.herokuapp.com/api/cs4802/project3/createresponse',
          data: {
              //Put experiment results in here
              "participant_id": this.state.participantID, 
              "trial_number": this.state.trialNum, 
              "viz_type": this.state.viz,
              "true_percentage": this.state.truePercent,
              "reported_percentage": this.state.reportedPercent,
          }}).then(res => console.log(res)).catch(err => console.log(err.response));

    } 

  render() {
    return (<div>
              <form onSubmit={this.handleSubmit}>
                  <label>
                    participantID
                    <input
                      name="participantID"
                      type="number"
                      value={this.state.participantID}
                      onChange={this.handlePIDChange} />
                  </label>
                  <br/>
                  <label>
                    trialNum
                    <input
                      name="trialNum"
                      type="number"
                      value={this.state.trialNum}
                      onChange={this.handleTrialNumChange} />
                  </label>
                  <br/>
                  <label>
                    Viz:
                      <input 
                        type="viz" 
                        value={this.state.viz} 
                        onChange={this.handleVizChange} />
                  </label>
                  <br/>
                  <label>
                    truePercent
                    <input
                      name="truePercent"
                      type="number"
                      value={this.state.truePercent}
                      onChange={this.handleTruePercentChange} />
                  </label>
                  <br/>
                  <label>
                    reportedPercent
                    <input
                      name="reportedPercent"
                      type="number"
                      value={this.state.reportedPercent}
                      onChange={this.handleReportedPercentChange} />
                  </label>
                  <input type="submit" value="Submit" />
              </form>
           </div>);
  }
} 

export default DatabaseExample;