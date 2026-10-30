import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    as?: 'button';
    href?: never;
  };

export type ButtonAsAnchor = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    as: 'a';
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    as = 'button',
    loading = false,
    disabled = false,
    iconRight,
    children,
    className = '',
    ...rest
  } = props;

  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && iconRight && (
        <span className="btn__icon-right">{iconRight}</span>
      )}
    </>
  );

  if (as === 'a') {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classNames}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={disabled || loading ? 'true' : undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={(e) => {
          if (disabled || loading) {
            e.preventDefault();
            return;
          }
          anchorProps.onClick?.(e);
        }}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type || 'button'}
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
