import { TiTick } from 'solid-icons/ti';
import { JSX } from 'solid-js';
import { Choice, ChoiceStyle } from '../types';
import { ChoiceProps } from '../types';
import { errorMessage } from '../utils/utils';

const SolidJsChoice = <T extends object | string>(
  props: ChoiceProps<T> & ChoiceStyle
) => {
  const selectItem = (event: MouseEvent) => {
    if (!props.choiceDisabled) {
      props.onSelected(props.item);
      event.stopPropagation();
    }
  };

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

  const solidjsChoiceStateStyles: JSX.CSSProperties =
    props.choiceSelected && props.selectionType === 'Background'
      ? {
          'background-color':
            'var(--solidjsSelectSelectedBackgroundBackgroundColor,Gainsboro)',
          'border-radius': '5px',
        }
      : props.choiceDisabled
      ? props.choiceDisabledStyle ?? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
          'background-color':
            'var(--solidjsSelectDisabledBackgroundColor, Gainsboro)',
          'background-image': 'var(--solidjsSelectDisabledBackgroundImage)',
        }
      : props.choiceHighlighted
      ? props.choiceHoverStyle ?? {
          color: 'var(--solidjsSelectHighlightedFontColor)',
          'background-color':
            'var(--solidjsSelectHighlightedBackgroundColor, lightgray)',
          'background-image': 'var(--solidjsSelectHighlightedBackgroundImage)',
        }
      : props.choiceSelected
      ? props.choiceSelectedStyle ?? {
          color: 'var(--solidjsSelectSelectedFontColor)',
          'background-color': 'var(--solidjsSelectSelectedBackgroundColor)',
          'background-image': 'var(--solidjsSelectSelectedBackgroundImage)',
        }
      : {
          'background-color': 'var(--solidjsSelectBackgroundColor)',
          'background-image': 'var(--solidjsSelectChoiceBackgroundImage)',
        };

  return (
    <div
      class={
        props.choiceDisabled
          ? props.choiceDisabledClassName
          : props.choiceHighlighted
          ? props.choiceHoverClassName
          : props.choiceSelected
          ? props.choiceSelectedClassName
          : props.choiceClassName
      }
      style={
        props.choiceStyle
          ? {
              ...props.choiceStyle,
              ...solidjsChoiceStateStyles,
            }
          : {
              display: 'flex',
              'flex-direction': 'row',
              'align-items': 'center',
              position: 'relative',
              border: 'var(--solidjsSelectChoiceSelectedIndicatorBorder)',
              ...solidjsChoiceStateStyles,
            }
      }
      onClick={selectItem}
    >
      {props.choiceSelected && props.selectionType === 'Border' && (
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
        {props.choiceSelected &&
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
