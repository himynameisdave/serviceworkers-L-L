
const defaultState = {
  isFetching: false,
  error: false,
  data: []
};

const fetchAww = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_AWW_PENDING':
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    case 'FETCH_AWW_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        data: state.data.length > 1
          ? state.data.push(action.payload.children)
          : action.payload.children
      });
    case 'FETCH_AWW_FAILED':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      });
    default:
      return state;
  }
};

export default fetchAww;
