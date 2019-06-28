import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {


  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    this.props.dispatch({
      type: 'FETCH_ITEMS'
    })
  }

  handleDeleteItem = (item) => {
    this.props.dispatch({
      type: 'DELETE_ITEM',
      payload: item,
    })
  }


  state = {
    description: '',
    image_url: '',
  }

  handleImage = (event) => {
    this.setState({
      ...this.state,
      image_url: event.target.value
    })
  }

  handleDescription = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleClick = () => {
    // console.log('this.state:', this.state);
    this.props.dispatch({ type: 'POST_IMAGE', payload: this.state });
    this.setState({
      description: '',
      image_url: ''
    })

  }

  render() {
    return (
      <div>
        {/* {JSON.stringify(this.props)} */}
        <p>
          Shelf Page<br /><br />
          <label>Image Source URL</label><br />
          <input onChange={this.handleImage} value={this.state.image_url} /><br /><br />
          <label>Description</label><br />
          <textarea rows="4" cols="100" onChange={this.handleDescription} value={this.state.description}></textarea><br />
          <button onClick={this.handleClick}>Add to Shelf</button>
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

