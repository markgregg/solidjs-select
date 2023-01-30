import { RiSystemArrowDropDownLine } from 'solid-icons/ri';
import { RiSystemCloseLine } from 'solid-icons/ri';
import SolidJsChoice from '../SolidJsChoice';
import ToolTip from '../ToolTip';
import {
  ChoiceStyle,
  SelectProps,
  ToolTipStyle,
  SelectStyle,
  DisplayStyle,
  ChoiceProps,
} from '../types';
import SolidJsDisplay from '../SolidJsDisplay';
import {
  SolidJsSelectFunctions,
  createSolidJsSelectFunctions,
} from './SolidJsModel';
import { createMemo, createSignal, JSX, onCleanup, onMount } from 'solid-js';
import { Cache, createCache } from '../cache/cache';
import { generateGuid } from '../utils/guidGenerator';
import { errorMessage } from '../utils/utils';
import VirtualContainer from 'solidjs-virtualisation';

export interface SolidJsSelectProps<T extends object | string>
  extends SelectProps<T>,
    SelectStyle,
    ChoiceStyle,
    DisplayStyle,
    ToolTipStyle {}

const SolidJsSelect = <T extends object | string>(
  props: SolidJsSelectProps<T>
) => {
  const selectId = generateGuid();
  const getSelection = (props: SelectProps<T>): T[] => {
    try {
      if (
        props.selectType === 'switch' ||
        (props.maximumSelections === 1 && props.minimumSelections === 1)
      ) {
        if (
          props.selected &&
          Array.isArray(props.selected) &&
          props.selected.length > 0
        ) {
          return [props.selected[0]];
        }
        if (props.selected && typeof props.selected === 'string') {
          return [props.selected];
        }
        if (props.choices && props.choices.length > 0) {
          return [props.choices[0]];
        }
        return [];
      }
      return props.selected && Array.isArray(props.selected)
        ? props.selected
        : props.selected && !Array.isArray(props.selected)
        ? [props.selected as T]
        : [];
    } catch (error) {
      console.log(`Failed to fetch selection, reason: ${errorMessage(error)}`);
    }
    return [];
  };
  const [clearHover, setClearHover] = createSignal<boolean>(false);
  const [selected, setSelected] = createSignal<T[]>(getSelection(props));
  const [caption, setCaption] = createSignal<string>('');
  const [displayText, setDisplayText] = createSignal<string>('');
  const [inputText, setInputText] = createSignal<string>('');
  const [showChoices, setShowChoices] = createSignal<boolean>(false);
  const [showToolTip, setShowToolTip] = createSignal<boolean>(false);
  const [visibleChoices, setVisibleChoices] = createSignal<T[]>([]);
  const [lookedUpChoices, setLookedUpChoices] = createSignal<T[]>();
  const [highlightedIndex, setHighlightedIndex] = createSignal<number>(0);
  const [token, setToken] = createSignal<string>('');
  const [position, setPosition] = createSignal<number>();
  const cache = createMemo<Cache<T> | undefined>(() =>
    props.cacheLookUp
      ? createCache<T>(
          props.title,
          props.cacheTimeToLive,
          props.cacheExpiryCheck
        )
      : undefined
  );
  const functions = createMemo<SolidJsSelectFunctions<T>>(() =>
    createSolidJsSelectFunctions(
      props,
      selectId,
      setCaption,
      setDisplayText,
      inputText,
      setInputText,
      showChoices,
      setShowChoices,
      setShowToolTip,
      selected,
      setSelected,
      visibleChoices,
      setVisibleChoices,
      lookedUpChoices,
      setLookedUpChoices,
      highlightedIndex,
      setHighlightedIndex,
      token,
      setToken,
      cache,
      setPosition
    )
  );

  onMount(() => {
    document.addEventListener('click', functions().clickedAway, true);
    functions().updateDisplayText();
  });

  onCleanup(() => {
    document.removeEventListener('click', functions().clickedAway, true);
  });

  const setClearIconHover = () => {
    setClearHover(true);
  };

  const clearClearIconHover = () => {
    setClearHover(false);
  };

  const setInputRef = (inputRef: HTMLInputElement) => {
    setTimeout(() => {
      if (inputRef) {
        inputRef.focus();
      }
    }, 10);
  };

  const choiceProps = (
    highlighted: boolean,
    selected: boolean,
    item: T
  ): ChoiceProps<T> & ChoiceStyle => {
    return {
      itemText: props.itemText,
      item,
      choiceSelected: selected,
      onSelected: selected
        ? (item) => functions().deselectItem(item)
        : (item) => functions().selectItem(item),
      choiceHighlighted: highlighted,
      choiceDisabled: functions().isDisabled(item),
      ...(props as ChoiceStyle),
    };
  };

  const constructChoice = (
    highlighted: boolean,
    selected: boolean,
    item: T
  ): JSX.Element =>
    props.choiceComponent ? (
      <div>
        {props.choiceComponent({ ...choiceProps(highlighted, selected, item) })}
      </div>
    ) : (
      <SolidJsChoice {...choiceProps(highlighted, selected, item)} />
    );

  const toolTip = (child: JSX.Element): JSX.Element =>
    props.toolTipComponent ? (
      props.toolTipComponent({
        children: child,
        tip: caption(),
        show: showToolTip(),
        ...(props as ToolTipStyle),
      })
    ) : (
      <ToolTip
        children={child}
        tip={caption()}
        show={showToolTip()}
        {...(props as ToolTipStyle)}
      />
    );

  const solidjsSelectStateStyle = (disbaled?: boolean): JSX.CSSProperties =>
    disbaled
      ? {
          'background-color':
            'var(--solidjsSelectDisabledBackgroundColor, Gainsboro)',
          'background-image': 'var(--solidjsSelectDisabledBackgroundImage)',
        }
      : {
          'background-color': 'var(--solidjsSelectBackgroundColor, white)',
          'background-image': 'var(--solidjsSelectBackgroundImage)',
        };

  const clearSelectionStateStyle = (
    disabled?: boolean,
    clearSelecitonDisabledStyle?: JSX.CSSProperties
  ): JSX.CSSProperties =>
    disabled
      ? clearSelecitonDisabledStyle ?? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
        }
      : clearHover()
      ? {
          color: 'var(--solidjsSelectFontColor, darkgray)',
        }
      : {};

  const inputStateStyle = (
    disabled?: boolean,
    inputDisabledStyle?: JSX.CSSProperties
  ): JSX.CSSProperties =>
    disabled
      ? inputDisabledStyle ?? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
        }
      : {};

  const titleStateStyle = (disabled?: boolean): JSX.CSSProperties =>
    disabled
      ? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
        }
      : {};

  return (
    <div
      class={props.disabled ? props.disabledClassName : props.className}
      style={{
        height: props.height,
        'min-height': props.minHeight,
        'max-height': props.maxHeight,
        width: props.width,
        'min-width': props.minWidth,
        'max-width': props.maxWidth,
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        position: 'relative',
        'font-weight': 'var(--solidjsSelectFontWeight)',
        'font-family': 'var(--solidjsSelectFontFamily)',
        'font-size': 'var(--solidjsSelectFontSize)',
        'font-style': 'var(--solidjsSelectFontStyle)',
        color: 'var(--solidjsSelectFontColor, black)',
        'border-radius': '5px',
        border: 'var(--solidjsSelectBorder, 2px solid WhiteSmoke)',
        ...props.style,
        ...solidjsSelectStateStyle(props.disabled),
      }}
      onMouseEnter={functions().checkToolTip}
      onMouseLeave={functions().hideToolTip}
      onPaste={functions().pasteText}
      onClick={functions().textInputClicked}
    >
      {toolTip(
        <div
          style={{
            display: 'flex',
            'flex-direction': 'row',
            'align-items': 'center',
          }}
        >
          {(!props.maximumSelections || props.maximumSelections < 1) &&
            selected().length > 0 &&
            props.selectType !== 'switch' && (
              <div
                class={
                  props.disabled
                    ? props.clearSelectionDisabledClassName
                    : props.clearSelectionClassName
                }
                style={{
                  'font-size':
                    'var(--solidjsSelectClearSelectionIconSize, small)',
                  'align-content': 'center',
                  display: 'flex',
                  'margin-right': '3px',
                  color: 'var(--solidjsSelectFontColor, black)',
                  ...props.clearSelectionStyle,
                  ...clearSelectionStateStyle(
                    props.disabled,
                    props.clearSelectionDisabledStyle
                  ),
                }}
                onClick={functions().clearSelection}
                onMouseEnter={setClearIconHover}
                onMouseLeave={clearClearIconHover}
              >
                {props.clearSelectionIcon ? (
                  <props.clearSelectionIcon />
                ) : (
                  <RiSystemCloseLine />
                )}
              </div>
            )}
          <div
            style={{
              display: 'flex',
              'flex-direction': 'row',
              'align-items': 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                flex: 1,
                'flex-basis': '100%',
              }}
            >
              {showChoices() &&
              (!props.selectType || props.selectType === 'standard') ? (
                <input
                  ref={setInputRef}
                  id={'csInput' + selectId}
                  class={
                    props.disabled
                      ? props.inputDisabledClassName
                      : props.inputClassName
                  }
                  style={{
                    'background-color': 'transparent',
                    border: 'none',
                    'max-width': 'var(--solidjsSelectInputTextMaxWidth,100%)',
                    color: 'var(--solidjsSelectFontColor, black)',
                    width: '100%',
                    outline: 'none',
                    ...props.inputStyle,
                    ...inputStateStyle(
                      props.disabled,
                      props.inputDisabledStyle
                    ),
                  }}
                  value={
                    showChoices()
                      ? inputText()
                      : displayText() === ''
                      ? props.title
                      : displayText()
                  }
                  placeholder={
                    showChoices() && inputText() === ''
                      ? displayText()
                      : undefined
                  }
                  disabled={props.disabled}
                  spellcheck={false}
                  autocapitalize="off"
                  autocomplete="off"
                  onInput={functions().textChanged}
                  onKeyDown={functions().inputKeyPressed}
                />
              ) : props.displayComponent ? (
                props.displayComponent({
                  title: props.title,
                  text: displayText(),
                  choicesShown: showChoices(),
                  selected: selected(),
                  selectType: props.selectType,
                  disabled: props.disabled,
                  ...(props as DisplayStyle),
                })
              ) : (
                <SolidJsDisplay
                  title={props.title}
                  text={displayText()}
                  choicesShown={showChoices()}
                  selected={selected()}
                  selectType={props.selectType}
                  disabled={props.disabled}
                  {...(props as DisplayStyle)}
                />
              )}
            </div>
            {!props.hideDropdownIcon && props.selectType !== 'switch' && (
              <div
                class={
                  props.disabled
                    ? props.dropIconDisabledClassName
                    : props.dropIconClassName
                }
                style={
                  props.disabled
                    ? props.dropdownIconDisabledStyle ?? {
                        color: 'var(--solidjsSelectDisabledFontColor)',
                      }
                    : props.dropdownIconStyle ?? {}
                }
              >
                {props.dropdownIcon ? (
                  <props.dropdownIcon />
                ) : (
                  <RiSystemArrowDropDownLine />
                )}
              </div>
            )}
          </div>
          {(showChoices() || displayText() !== '') && !props.hideTitle && (
            <p
              class={
                props.disabled
                  ? props.titleDisabledClassName
                  : props.titleClassName
              }
              style={{
                position: 'absolute',
                top: '-30px',
                'font-size': 'var(--solidjsSelectTitleFontSize, small)',
                'font-weight': 'var(--solidjsSelectTitleFontWeight, 100)',
                ...props.titleStyle,
                ...titleStateStyle(props.disabled),
              }}
            >
              {props.title}
            </p>
          )}
          {!props.disabled && showChoices() && (
            <div
              id={'csList' + selectId}
              class={props.choiceListClassName}
              style={{
                'max-height': props.maxListHeight
                  ? `${props.maxListHeight}px`
                  : '300px',
                position: 'absolute',
                top: '30px',
                width: '-webkit-fill-available',
                overflow: 'auto',
                'border-radius': '5px',
                'z-index': 1,
                border: 'var(--solidjsSelectBorder, 2px solid WhiteSmoke)',
                'background-color':
                  'var(--solidjsSelectBackgroundColor, white)',
                'background-image': 'var(--solidjsSelectBackgroundImage)',
                ...props.choiceListStyle,
              }}
            >
              {visibleChoices().length > 0 && (
                <VirtualContainer
                  orientation="Vertical"
                  items={visibleChoices()}
                  itemSize={props.itemSize ?? 22}
                  listSize={props.maxListHeight ?? 300}
                  moveToItem={position()}
                  render={(item, index) => (
                    <div
                      id={`item_${index}`}
                      onMouseOver={() =>
                        functions().adjustHighlightedIndex(index)
                      }
                    >
                      {constructChoice(
                        highlightedIndex() === index,
                        selected().indexOf(item) !== -1,
                        item
                      )}
                    </div>
                  )}
                />
              )}
              {visibleChoices().length === 0 &&
                !props.choices &&
                !lookedUpChoices() && (
                  <p>{props.loadingText ?? 'Loading...'}</p>
                )}
              {props.choices?.length === 0 && lookedUpChoices() && (
                <p>{props.noItemText ?? 'No items.'}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SolidJsSelect;
