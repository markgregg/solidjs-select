import { JSX } from 'solid-js';
import { DisplayProps, DisplayStyle } from '../types';

const SolidJsDisplay = <T extends object | string>(
  props: DisplayProps<T> & DisplayStyle
) => {
  const displayTextStyle: JSX.CSSProperties =
    props.selected.length === 0 &&
    (!props.choicesShown || !props.selectType || props.selectType === 'switch')
      ? {
          'font-weight': 'var(--solidjsSelectTitleFontWeight, 100)',
        }
      : {
          'font-weight': 'var(--solidjsSelectSelectedItemFontWeight, bold)',
        };

  const displayStateStyle: JSX.CSSProperties = props.disabled
    ? props.displayDisabledStyle ?? {
        color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
      }
    : props.displayStyle ?? {};

  return (
    <p
      class={
        props.disabled ? props.displayDisabledClassName : props.displayClassName
      }
      style={{
        'margin-block-start': '0px',
        'margin-block-end': '0px',
        '-moz-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        ...props.displayStyle,
        ...displayTextStyle,
        ...displayStateStyle,
      }}
    >
      {props.selected.length === 0 &&
      (!props.choicesShown ||
        !props.selectType ||
        props.selectType === 'switch')
        ? props.title
        : props.text}
    </p>
  );
};

export default SolidJsDisplay;
