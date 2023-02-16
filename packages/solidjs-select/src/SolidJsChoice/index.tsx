import { TiTick } from 'solid-icons/ti';
import { createEffect, createSignal, JSX } from 'solid-js';
import { Choice, ChoiceStyle, ChoiceProps } from '../types';
import { errorMessage } from '../utils/utils';

const SolidJsChoice = <T extends object | string>(
  props: ChoiceProps<T> & ChoiceStyle 
) => {
  const [highLighted, setHighLighted] = createSignal<boolean>(false);
  
  const selectItem = (event: MouseEvent) => {
    if (!props.choiceDisabled) {
      props.onItemClicked(props.item);
      event.stopPropagation();
    }
  };

  createEffect(() => {
    const highlight = props.index === props.highlightedIndex();
    if( highlight !== highLighted()) {
      setHighLighted(highlight);
    }
  });

  const getItemText = (item: T): string => {
    try {
      return (
        (item as Choice).text ??
        (props.itemText ? props.itemText(item) : (item as string))
      );
    } catch (error) {
      console.log(
        `Object type either does not implement Choice, the property getters (itemText | itemValue) or is not a string, error: ${errorMessage}`
      );
    }
    return '';
  };

  const solidjsChoiceStateStyles = (highLighted: boolean): JSX.CSSProperties => {
    return highLighted
        ? props.choiceHoverStyle ?? {
          color: 'var(--solidjsSelectHighlightedFontColor)',
          'background-color':
            'var(--solidjsSelectHighlightedBackgroundColor, lightgray)',
          'background-image': 'var(--solidjsSelectHighlightedBackgroundImage)',
        }
      : props.isSelected && props.selectionType === 'Background'
      ? {
          'background-color':
            'var(--solidjsSelectSelectedChoiceBackgroundColor,Gainsboro)',
          'border-radius': '5px',
        }
      : props.choiceDisabled
      ? props.choiceDisabledStyle ?? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
          'background-color':
            'var(--solidjsSelectDisabledBackgroundColor)',
          'background-image': 'var(--solidjsSelectDisabledBackgroundImage)',
        }
      : props.isSelected
      ? props.choiceSelectedStyle ?? {
          color: 'var(--solidjsSelectSelectedFontColor)',
          'background-color': 'var(--solidjsSelectSelectedBackgroundColor)',
          'background-image': 'var(--solidjsSelectSelectedBackgroundImage)',
        }
      : {
          'background-color': 'var(--solidjsSelectBackgroundColor)',
          'background-image': 'var(--solidjsSelectChoiceBackgroundImage)',
        };
  }

  return (
    <div
      class={
        props.choiceDisabled
          ? props.choiceDisabledClassName
          : highLighted()
          ? props.choiceHoverClassName
          : props.isSelected
          ? props.choiceSelectedClassName
          : props.choiceClassName
      }
      style={{
        "user-select": "none",
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        position: 'relative',
        border: 'var(--solidjsSelectChoiceSelectedIndicatorBorder)',
        ...props.choiceStyle,
        ...solidjsChoiceStateStyles(highLighted()),
      }}
      onClick={selectItem}
    >
      {props.isSelected && props.selectionType === 'Border' && (
        <>
          <div
            style={{
              'border-left':
                'var(--solidjsSelectSelectedColor,green) 3px solid',
              position: 'absolute',
              top: '15%',
              height: '70%',
            }}
          />
          <div style={{ 'margin-left': '3px' }} />
        </>
      )}
      <div>
        {props.isSelected &&
          (!props.selectionType || props.selectionType === 'Icon') && (
            <div
              class={props.choiceSelectedIconClassName}
              style={
                props.choiceSelectedIconStyle ?? {
                  'font-size': 'var(--solidjsSelectSelectedIconSize, large)',
                  color: 'var(--solidjsSelectSelectedIconColor, green)',
                }
              }
            >
              {props.choiceSelectedIcon ? (
                <props.choiceSelectedIcon />
              ) : (
                <TiTick />
              )}
            </div>
          )}
      </div>
      <p style={{ margin: '2px' }}>{getItemText(props.item)}</p>
    </div>
  );
};

export default SolidJsChoice;
