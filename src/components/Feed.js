import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loady from './Loady';
import { fetchAww } from '../actions/fetchAww';
import './Feed.css'

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
    this.props.fetchAww();
  }

  renderFeedBody() {
    const { data } = this.props.awws;
    if (data) {
      // console.log(data.children[0]);
      return data.map((post, i) => (
        <div
          key={i}
          className="feed--item"
        >
          <a
            href={post.url}
            target="_blank"
          >
            <img src={post.thumbnail} alt={post.title} />
          </a>
        </div>
      ))
    }
    return null;
  }

  render() {
    const { isFetching } = this.props.awws;
    return (
      <section className="feed">
        {isFetching ? (<Loady />) : null}
        {this.renderFeedBody()}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
