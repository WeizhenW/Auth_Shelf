const itemReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default itemReducer;
  