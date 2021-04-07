import React from 'react';
import thumbUpUrl from './thumb-up.svg';
import './splash.css';

const SplashView = ({ children, className }) => (
  <div className={['splash-view inline-content block-content', className || ''].join(' ')}>
    <aside>
      <img className="splash-view-image" src={thumbUpUrl} alt="" width="312" height="184" />
    </aside>

    <main>
      {children}
    </main>
  </div>
);

export default SplashView;
