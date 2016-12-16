import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import truncate from 'truncate';
import Loady from './Loady';
import { fetchAww } from '../actions/fetchAww';
import './Feed.css'
const throttle = require('../../package.json').throttle;

const mapStateToProps = (state) => ({
  awws: state.fetchAww
});

const mapDispatchToProps = (dispatch) => ({
  fetchAww: () => dispatch(fetchAww())
});

class Feed extends Component {
  static propTypes = {
    awws: PropTypes.object,
    fetchAww: PropTypes.func
  }

  componentWillMount() {
    setTimeout(this.props.fetchAww, throttle);
  }

  onFeedItemClick(target) {
    window.open(target, '_blank');
  }

  stripGifv(url) {
      return url.includes('.gifv') ? url.replace('.gifv', '.gif') : url;
  }

  renderFeedBody() {
    const { data } = this.props.awws;
    if (data) {
      // console.log(data.children[0]);
      return data.map((post, i) => (
        <div
          key={i}
          className="feed--item"
          href={post.url}
          target="_blank"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div
            className="feed--item-image"
            style={{ backgroundImage: `url('${post.thumbnail}')`}}
          ></div>
          <div className="feed--item-info" onClick={this.onFeedItemClick.bind(this, post.url)}>
            <div className="feed--item-info-title">
              {truncate(post.title, 35)}
            </div>
            <div className="feed--item-info-meta">
              {post.fromNow} | Reddit Score {post.score}
            </div>
          </div>
        </div>
      ))
    }
    return null;
  }

  render() {
    const { isFetching, data } = this.props.awws;
    const feedBody = this.renderFeedBody();
    return (
      <section className="feed">
        {isFetching || data.length === 0 ? (<Loady />) : null}
        {feedBody}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
