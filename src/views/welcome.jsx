import React from 'react';
import PropTypes from 'prop-types';
import SplashView from './splash';
import { Button } from '../components';

const WelcomeView = ({ onStart }) => (
  <SplashView className="welcome-view">
    <h1 className="headline">Who wants to be a millionare?</h1>
    {onStart
      && <Button onClick={onStart}>Start</Button>}
  </SplashView>
);

WelcomeView.propTypes = {
  onStart: PropTypes.func,
};

WelcomeView.defaultProps = {
  onStart: null,
};

export default WelcomeView;
