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
          "width": `${parentWidth ?? 80}px`
        };
      case 'left':
        return {
          top: '0px',
          left: parentWidth ? `${parentWidth+5}px` : '110%',
          "max-width": `${parentWidth ?? 80}px`
        };
      case 'right':
        return {
          top: '0px',
          left: clientWidth ? `-${clientWidth+5}px` :'-90px',
          "max-width": `${parentWidth ?? 80}px`
        };
      default:
        return {
          top: parentHeight ? `${parentHeight+5}px` : '120%',
          left: '0%',
          "width": `${parentWidth ?? 80}px`
        };
    }
  };
  
  return (
    <div
      ref={textSpan}
      class={props.toolTipClassName}
      style={{
        position: 'absolute',
        'z-index': 999,
        padding: '3px',
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
        ...position(props.toolTipPosition ?? 'below', props.parentWidth, props.parentHeight, height(), width()),
      }}
    >
      {props.tip}
    </div>
  );
};

export default ToolTip;
