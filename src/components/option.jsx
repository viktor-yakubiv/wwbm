import React from 'react';
import './option.css';

const Option = ({
  children, className, status, ...htmlProps
}) => (
  <li
    className={['option', status || '', className].join(' ')}
    {...htmlProps}
  >
    <button type="button" aria-pressed={status === 'selected'}>
      {children}
    </button>
  </li>
);

const OptionList = ({
  items, className, onSelect, ...restProps
}) => (
  <ol className={['option-list', className || ''].join(' ')} {...restProps}>
    {items.map(({
      caption, value, selected, correct,
    }) => {
      const status = [selected && !correct && 'wrong', correct && 'correct', selected && 'selected']
        .find((truthy) => truthy);

      return (
        <Option
          key={value}
          status={status}
          onClick={() => onSelect(value || caption)}
        >
          {caption || value}
        </Option>
      );
    })}
  </ol>
);

export default Option;
export { OptionList };
