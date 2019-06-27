import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount(){
    this.props.dispatch({
      type: 'FETCH_ITEMS',
    })
  }

  render() {
    return (
  <div>
    <pre>
      {JSON.stringify(this.props.reduxState.user, null, 2)}
      {JSON.stringify(this.props.reduxState.itemReducer, null, 2)}
    </pre>
    <p>
      Shelf Page
    </p>
    
  </div>
 )}
}
const mapReduxStateToProps = reduxState => ({
  reduxState,
})
export default connect(mapReduxStateToProps)(InfoPage);
