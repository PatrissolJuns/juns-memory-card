import React from 'react';

const JMCTitle = ({displayPaddingBottom, title, paddingButtonTitle, ...props}) => {
  const classes = ['jmc-title', 'py-1'];
  if(displayPaddingBottom) classes.push('pb-5');
  if(title.length > 10) classes.push('jmc-size-small');

  return (
      <div {...props} className={classes.join(' ')}>
        <h2 className={paddingButtonTitle ? paddingButtonTitle : 'pb-1'}>{title}</h2>
        <span> </span>
      </div>
  );
};

export default JMCTitle;
