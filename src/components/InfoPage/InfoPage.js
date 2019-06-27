import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_ITEMS',
    })
  }

  handleDeleteItem = (item) => {
    this.props.dispatch({
      type: 'DELETE_ITEM',
      payload: item,
    })

    console.log('in handle delete');
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
        <ul>
          {this.props.reduxState.itemReducer.length !== 0 && this.props.reduxState.itemReducer.map(item => {
            return <li key={item.id}>
              <p>{item.description}</p>
              <img src={item.image_url} alt="pic" />
              {this.props.reduxState.user.id === item.user_id ?
                <>
                  <br />
                  <button onClick={() => this.handleDeleteItem(item)}>Delete</button>
                </>
                :
                <></>}
            </li>
          }
          )}
        </ul>
      </div>
    )
  }
}
const mapReduxStateToProps = reduxState => ({
  reduxState,
})
export default connect(mapReduxStateToProps)(InfoPage);
