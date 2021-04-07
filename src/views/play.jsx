import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { OptionList, StepList } from '../components';
import { formatCurrency } from '../utils';
import './play.css';

const useSidebarToggle = (initialState = false) => {
  const [isOpen, setOpen] = useState(initialState);
  const toggleSidebar = useCallback(() => setOpen((value) => !value), [setOpen]);
  return [isOpen, toggleSidebar];
};

const PlayView = ({
  levels, reward = 0, question, answers, onAnswer,
}) => {
  const [levelsMenuOpen, toggleLevelsMenu] = useSidebarToggle();
  const optionItems = answers;
  const stepItems = levels.map(({ reward: levelReward, current, passed }) => ({
    caption: formatCurrency(levelReward),
    status: [passed && 'past', current && 'current', 'future'].find((truthy) => truthy),
  }));

  return (
    <div className="play-view">
      <h1 className="visually-hidden">Who wants to be a millionare?</h1>

      <main className="play-view-main block-content inline-content">
        <h2 className="visually-hidden">
          Question for
          {formatCurrency(reward)}
        </h2>
        <p className="question play-view-question">{question}</p>
        <OptionList
          className="play-view-option-list"
          items={optionItems}
          onSelect={onAnswer}
        />
      </main>

      <aside className={`play-view-sidebar block-content ${levelsMenuOpen ? 'open' : ''}`}>
        <h2 className="visually-hidden">Game steps</h2>
        <StepList items={stepItems} />
      </aside>

      <button className="play-view-sidebar-toggle" type="button" onClick={toggleLevelsMenu} aria-pressed={levelsMenuOpen}>
        Open levels view
      </button>
    </div>
  );
};

PlayView.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.shape({
    reward: PropTypes.number.isRequired,
    passed: PropTypes.bool.isRequired,
    curret: PropTypes.bool.isRequired,
  })).isRequired,
  reward: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    correct: PropTypes.bool,
  })).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default PlayView;
