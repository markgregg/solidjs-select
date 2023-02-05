import { createSignal, JSX, onMount } from 'solid-js';
import { TitleProps, TitleStyle } from '../types';

const SolidTitle = (props: TitleProps & TitleStyle) => {
  const [height,setHeight] = createSignal<number>(0)
  let titleRef: HTMLParagraphElement | undefined = undefined;

  onMount(() => {
    setHeight(titleRef?.clientHeight ?? 0);
  });
  
  const titleStateStyle = (disabled?: boolean): JSX.CSSProperties =>
    disabled
      ? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
        }
      : {};

  return (
    <p
      ref={titleRef}
      class={
        props.disabled
          ? props.titleDisabledClassName
          : props.titleClassName
      }
      style={{
        position: 'absolute',
        top: height() !== 0 ? `-${height() + 1}px` : '-15px',
        'font-size': 'var(--solidjsSelectTitleFontSize, small)',
        'font-weight': 'var(--solidjsSelectTitleFontWeight, 100)',
        "margin-block-start": "0px",
        "margin-block-end": "0px",
        ...props.titleStyle,
        ...titleStateStyle(props.disabled),
      }}
    >
      {props.title}
    </p>
  );
};

export default SolidTitle;
