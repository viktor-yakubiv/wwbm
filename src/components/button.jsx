import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({
  children, className, href, tag: Tag = href ? 'a' : 'button', ...restProps
}) => <Tag className={['button', className].join(' ')} href={href} {...restProps}>{children}</Tag>;

Button.propTypes = {
  href: PropTypes.string,
};

Button.defaultProps = {
  href: null,
};

export default Button;
