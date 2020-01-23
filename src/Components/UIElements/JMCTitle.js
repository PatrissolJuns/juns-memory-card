import React from 'react';
import PropTypes from 'prop-types';

const JMCTitle = ({
                    title,
                    displayPaddingBottom = false,
                    paddingButtonTitle = 'pb-1',
                    underlined = true,
                    ...props}) => {
  const classes = ['jmc-title', 'py-1'];
  if(displayPaddingBottom) classes.push('pb-5');
  if(title.length > 10) classes.push('jmc-size-small');

  return (
      <div {...props} className={classes.join(' ')}>
        <h2 className={paddingButtonTitle ? paddingButtonTitle : 'pb-1'}>{title}</h2>
        {underlined ? <span> </span> : null }
      </div>
  );
};

JMCTitle.propTypes = {
  displayPaddingBottom: PropTypes.bool,
  title: PropTypes.string.isRequired,
  paddingButtonTitle: PropTypes.string,
  underlined: PropTypes.bool,
}

export default JMCTitle;
