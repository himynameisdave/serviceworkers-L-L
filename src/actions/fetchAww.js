import 'whatwg-fetch';
//  Parse the date up in hur
import moment from 'moment';

const fetchAww_pending = () => ({
  type: 'FETCH_AWW_PENDING'
});

const fetchAww_success = (data) => ({
  type: 'FETCH_AWW_SUCCESS',
  payload: data
});

const fetchAww_failed = (error) => ({
  type: 'FETCH_AWW_FAILED',
  payload: error
});


const parseResponseChildren = (res) => {
  return res.data.children.reduce((acc, post, i) => {
    //  The top post is bullshit
    if (i > 0) {
      const { id, created_utc, thumbnail, url, score, title } = post.data;
      if (thumbnail !== 'default') {
        const fromNow = moment(created_utc * 1000).fromNow();
        acc.push({ id, fromNow, thumbnail, url, score, title });
      }
    }
    return acc;
  }, []);
};

const parseResponse = (response) => Object.assign({}, response.data, {
  children: parseResponseChildren(response)
});

// const doFetch = (url) => new Promise((res, rej) => {
//   const
// });

export const fetchAww = (url) => {
  const baseUrl = 'https://www.reddit.com/r/aww/new/.json';
  return (dispatch) => {
    dispatch(fetchAww_pending());
    fetch(url || baseUrl)
      .then(r => r.json())
      .then(response => {
        dispatch(fetchAww_success(parseResponse(response)));
        return fetchAww(`${baseUrl}?count=25&after=${response.data.after}`);
      })
      // .then(r => r.json())
      .then(response => {
        // dispatch(fetchAww_success(parseResponse(response)));
        // return fetchAww(`${baseUrl}?count=25&after=${response.data.after}`);
      })
      // .then(r => r.json())
      // .then(response => {
      //   dispatch(fetchAww_success(parseResponse(response)));
      //   return fetchAww(`${baseUrl}?count=25&after=${response.data.after}`);
      // })
      .catch(e => {
        console.warn(e);
        dispatch(fetchAww_failed(e));
      });
  };
}
