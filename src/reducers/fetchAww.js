
const defaultState = {
  isFetching: false,
  error: false,
  payload: []
};

const fetchAww = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_AWW_REQUEST_PENDING':
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    default:
      return state;
  }
};

export default fetchAww;
