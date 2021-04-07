import React from 'react';
import PropTypes from 'prop-types';
import './step.css';

const Step = ({
  children, status, className, ...restProps
}) => (
  <li className={['step', status, className || ''].join(' ')} {...restProps}>{children}</li>
);

Step.propTypes = {
  status: PropTypes.oneOf(['future', 'current', 'past']),
};

Step.defaultProps = {
  status: 'future',
};

const StepList = ({ items, className, ...restProps }) => (
  <ol className={['step-list', className || ''].join(' ')} {...restProps}>
    {items.map(({ caption, status = 'future' }) => (
      <Step key={caption} status={status}>
        {caption}
      </Step>
    ))}
  </ol>
);

StepList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
    status: Step.propTypes.status,
  })).isRequired,
};

export default Step;
export { StepList };
