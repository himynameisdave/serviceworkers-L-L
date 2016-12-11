import React from 'react';
import './Loady.css';

const Loady = () => {
  const emoji = [ '🐔', '🍕', '🍽 '];
  const loadyEmojis = emoji.map((e, i) => (<span className="loady--emoji" key={i}>{e}</span>));
  return (
    <div className="loady">
      <div className="loady-l">
        {loadyEmojis}
      </div>
      <div className="loady-l">
        <span className="loady--text">
          ServiceAwworkers is loading...
        </span>
      </div>
    </div>
  );
};


export default Loady;
