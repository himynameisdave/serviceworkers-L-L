import 'whatwg-fetch';


export const fetchAww = () => ({
  type: 'FETCH_AWW_REQUEST',
  payload: fetch('https://www.reddit.com/r/aww/.json')
});
