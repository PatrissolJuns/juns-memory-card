import React from 'react';

const JMCLink = ({link, textLink, ...props}) => {
  return (
      <div {...props} className="jmc-link">
        <a href={link}>{textLink}</a>
      </div>
  );
};

export default JMCLink;
