import React from 'react';
import PropTypes from 'prop-types';
import SplashView from './splash';
import { Button } from '../components';

const ResultView = ({ finalReward, onRetry }) => (
  <SplashView className="result-view">
    <div>
      <h2 className="question muted">Total score:</h2>
      <p className="headline">
        $&#x200A;
        {finalReward}
        {' '}
        earned
      </p>
    </div>
    {onRetry
      && <Button onClick={onRetry}>Try again</Button>}
  </SplashView>
);

ResultView.propTypes = {
  finalReward: PropTypes.number.isRequired,
  onRetry: PropTypes.func,
};

ResultView.defaultProps = {
  onRetry: null,
};

export default ResultView;
