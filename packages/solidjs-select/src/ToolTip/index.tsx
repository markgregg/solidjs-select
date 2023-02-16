import { createSignal, onMount } from 'solid-js';
import { ToolTipPosition, ToolTipProps, ToolTipStyle } from '../types';

const ToolTip = (props: ToolTipProps & ToolTipStyle) => {
  const [height,setHeight] = createSignal<number>()
  const [width,setWidth] = createSignal<number>()
  let textSpan: HTMLSpanElement | undefined = undefined;

  onMount(() => {
    setHeight(textSpan?.clientHeight);
    setWidth(textSpan?.clientWidth);
  });

  const position = (toolTipPosition: ToolTipPosition, parentWidth?: number, parentHeight?: number, clientHeight?: number, clientWidth?: number): any => {
    switch (toolTipPosition) {
      case 'above':
        return {
          top: clientHeight ? `-${clientHeight+5}px` : '-120%',
          left: '0px',
          'justify-content': 'center'
        };
      case 'right':
        return {
          top: '0px',
          left: parentWidth ? `${parentWidth+5}px` : '110%',
          'justify-content': 'start'
        };
      case 'left':
        return {
          top: '0px',
          left: parentWidth 
            ? `-${parentWidth+4}px` 
            : clientWidth 
              ? `-${clientWidth+5}px` 
              : '-100%',
          'justify-content': 'end'
        };
      default:
        return {
          top: parentHeight ? `${parentHeight+5}px` : '120%',
          left: '0%',
          'justify-content': 'center'
        };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        'z-index': 999,
        width: `${props.parentWidth}px`,
        ...position(props.toolTipPosition ?? 'below', props.parentWidth, props.parentHeight, height(), width()),
      }}
    >
      <div
        ref={textSpan}
        class={props.toolTipClassName}
        style={{
          padding: '3px',
          "max-width": `${props.parentWidth ?? 80}px`,
          color: 'var(--solidjsSelectToolTipFontColor, black)',
          'font-weight': 'var(--solidjsSelectToolTipFontWeight)',
          'font-family': 'var(--solidjsSelectFontFamily)',
          'font-size': 'var(--solidjsSelectToolTipFontSize, small)',
          'font-style': 'var(--solidjsSelectToolTipFontStyle)',
          'border-radius': '5px',
          'text-align': 'var(--solidjsSelectToolTipTextAlign, center)',
          border: 'var(--solidjsSelectToolTipBorder)',
          'background-color':
            'var(--solidjsSelectToolTipBackgroundColor, white)',
          'background-image': 'var(--solidjsSelectToolTipBackgroundImage)',
          ...props.toolTipStyle,
        }}
      >
        {props.tip}
      </div>
    </div>
  );
};

export default ToolTip;
