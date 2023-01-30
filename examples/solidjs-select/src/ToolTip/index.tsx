import { ToolTipPosition, ToolTipProps, ToolTipStyle } from '../types';

const ToolTip = (props: ToolTipProps & ToolTipStyle) => {
  const position = (toolTipPosition: ToolTipPosition): any => {
    switch (toolTipPosition) {
      case 'above':
        return {
          top: '-100%',
          left: '0px',
        };
      case 'left':
        return {
          top: '-25%',
          left: '100%',
          width: '80px',
        };
      case 'right':
        return {
          top: '-25%',
          left: '-80px',
          width: '80px',
        };
      default:
        return {
          top: '100%',
          left: '0%',
        };
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      {props.children}
      {props.show && props.tip !== '' && (
        <span
          class={props.toolTipClassName}
          style={{
            position: 'absolute',
            'z-index': 1,
            padding: '3px',
            color: 'var(--compactSelectToolTipFontColor, black)',
            'font-weight': 'var(--compactSelectToolTipFontWeight)',
            'font-family': 'var(--compactSelectFontFamily)',
            'font-size': 'var(--compactSelectToolTipFontSize, small)',
            'font-style': 'var(--compactSelectToolTipFontStyle)',
            'border-radius': '5px',
            'text-align': 'var(--compactSelectToolTipTextAlign, center)',
            border: 'var(--compactSelectToolTipBorder)',
            'background-color':
              'var(--compactSelectToolTipBackgroundColor, white)',
            'background-image': 'var(--compactSelectToolTipBackgroundImage)',
            ...props.toolTipStyle,
            ...position(props.toolTipPosition ?? 'below'),
          }}
        >
          {props.tip}
        </span>
      )}
    </div>
  );
};

export default ToolTip;
