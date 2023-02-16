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
  TitleStyle,
  EdgeType,
} from '../types';
import SolidJsDisplay from '../SolidJsDisplay';
import {
  SolidJsSelectFunctions,
  createSolidJsSelectFunctions,
} from './SolidJsModel';
import { createEffect, createMemo, createSignal, JSX, onCleanup, onMount } from 'solid-js';
import { Cache, createCache } from '../cache/cache';
import { generateGuid } from '../utils/guidGenerator';
import { errorMessage } from '../utils/utils';
import VirtualContainer, { VirtualContainerRef } from "solidjs-virtualisation";
import SolidTitle from '../SolidTitle';

export interface SolidJsSelectProps<T extends object | string>
  extends SelectProps<T>,
    SelectStyle,
    ChoiceStyle,
    DisplayStyle,
    TitleStyle,
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
 
  const [mainDivRef,setMainDivRef] = createSignal<HTMLDivElement>();
  const [outerDivRef,setOuterDivRef] = createSignal<HTMLDivElement>();
  const [choiceHeight,setChoiceHeight] = createSignal<string>('');
  const [choiceWidth,setChoiceWidth] = createSignal<string>('');
  const [outerDivHeight,setOuterDivHeight] = createSignal<number>(0);
  const [toolTipDivHeight,setToolTipDivHeight] = createSignal<number>(0);
  const [toolTipDivWidth,setToolTipDivWidth] = createSignal<number>(0);
  const [containerRef, setContainerRef] = createSignal<VirtualContainerRef>();
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
  const [tracking, setTracking] = createSignal<boolean>(false);
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
      containerRef,
      tracking
    )
  );

  const [mainResizeObserver,setMainResizeObserver] = createSignal<ResizeObserver>();
  const [outerResizeObserver,setOuterResizeObserver] = createSignal<ResizeObserver>();

  onMount(() => {
    const mainDiv = mainDivRef();
    if( mainDiv ) {
      setMainResizeObserver(new ResizeObserver(() => {
        setChoiceHeight(`${mainDiv.clientHeight+4}px`);
        setChoiceWidth(`${mainDiv.clientWidth}px`);
        setToolTipDivHeight(mainDiv.clientHeight);
        setToolTipDivWidth(mainDiv.clientWidth);
      }));
      setChoiceHeight(`${mainDiv.clientHeight}px`);
      setChoiceWidth(`${mainDiv.clientWidth}px`);
      setToolTipDivHeight(mainDiv.clientHeight);
      setToolTipDivWidth(mainDiv.clientWidth);
      mainResizeObserver()?.observe(mainDiv);
    }
    const outerDiv = outerDivRef();
    if( outerDiv ) {
      setOuterResizeObserver(new ResizeObserver(() => {
        setOuterDivHeight(outerDiv.clientHeight);
      }));
      setOuterDivHeight(outerDiv.clientHeight);
      outerResizeObserver()?.observe(outerDiv);
    }    
    
    document.addEventListener('mouseup', functions().clickedAway, true);
    const selected = getSelection(props);
    if( selected.length === 1 ) {
      functions().selectItem(selected[0]);
    }
    functions().updateDisplayText();
  });

  onCleanup(() => {
    outerResizeObserver()?.disconnect(); 
  })

  createEffect(() => {
    
  });

  onCleanup(() => {
    document.removeEventListener('mouseup', functions().clickedAway, true);
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
    item: T,
    index: number,
    selected: boolean
  ): ChoiceProps<T> & ChoiceStyle => {
    return {
      itemText: props.itemText,
      item,
      index,
      isSelected: selected,
      highlightedIndex,
      onItemClicked: functions().itemClicked,
      choiceDisabled: functions().isDisabled(item),
      ...(props as ChoiceStyle),
    };
  };

  const constructChoice = (
    item: T,
    index: number,
    selected: boolean
  ): JSX.Element =>
    props.choiceComponent ? (
      <div>
        {props.choiceComponent({ ...choiceProps(item, index, selected) })}
      </div>
    ) : (
      <SolidJsChoice {...choiceProps(item, index, selected)} />
    );

  const toolTip = (): JSX.Element =>
    props.toolTipComponent ? (
      props.toolTipComponent({
        parentHeight: toolTipDivHeight(),
        parentWidth: toolTipDivWidth(),
        tip: caption(),
        ...(props as ToolTipStyle),
      })
    ) : (
      <ToolTip
        parentHeight={toolTipDivHeight()}
        parentWidth={toolTipDivWidth()}
        tip={caption()}
        {...(props as ToolTipStyle)}
      />
    );

  const solidjsSelectStateStyle = (disbaled?: boolean, dropdown?: Boolean): JSX.CSSProperties =>
    disbaled
      ? {
          'background-color':
            'var(--solidjsSelectDisabledBackgroundColor, Gainsboro)',
          'background-image': 'var(--solidjsSelectDisabledBackgroundImage)',
        }
      : dropdown 
        ? {
          'background-color': 'var(--solidjsSelectDropDownBackgroundColor,var(--solidjsSelectBackgroundColor, DarkGray))',
          'background-image': 'var(--solidjsSelectDropDownBackgroundImage,var(--solidjsSelectBackgroundImage))',
        }
        : {
          'background-color': 'var(--solidjsSelectBackgroundColor, white)',
          'background-image': 'var(--solidjsSelectBackgroundImage)',
        };
  
  const solidjsSelectEdgeStateStyle = (disbaled?: boolean, dropdown?: Boolean, opaqueEnds?: boolean): JSX.CSSProperties =>
    disbaled
      ? {
          'background-color':
            'var(--solidjsSelectDisabledBackgroundColor, Gainsboro)',
          'background-image': 'var(--solidjsSelectDisabledBackgroundImage)',
        }
      : dropdown || opaqueEnds 
        ? {
          'background-color': 'var(--solidjsSelectDropDownBackgroundColor,var(--solidjsSelectBackgroundColor, DarkGray))',
          'background-image': 'var(--solidjsSelectDropDownBackgroundImage,var(--solidjsSelectBackgroundImage))',
        }
        : {
          'background-color': 'var(--solidjsSelectBackgroundColor, white)',
          'background-image': 'var(--solidjsSelectBackgroundImage)',
        };

  const dropdownStateStyle = (
    disabled?: boolean,
    dropdownIconDisabledStyle?: JSX.CSSProperties,
    dropdownIconStyle?: JSX.CSSProperties
  ): JSX.CSSProperties =>
    disabled
      ? (dropdownIconDisabledStyle ?? {
        color: 'var(--solidjsSelectDisabledFontColor)',
        })
      : dropdownIconStyle ?? {}
  
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

  const borderStyle = (
    edgeType?: EdgeType
  ): JSX.CSSProperties => {
    return edgeType === 'Round' 
      ? {
        'border-top': 'var(--solidjsSelectBorder, 2px solid LightGray)',
        'border-bottom': 'var(--solidjsSelectBorder, 2px solid LightGray)',
        }
      : {
        'border': 'var(--solidjsSelectBorder, 2px solid LightGray)',
        'border-radius': '5px'
      }
  }
  const inputStateStyle = (
    disabled?: boolean,
    inputDisabledStyle?: JSX.CSSProperties
  ): JSX.CSSProperties =>
    disabled
      ? inputDisabledStyle ?? {
          color: 'var(--solidjsSelectDisabledFontColor, darkgray)',
        }
      : {};

  const center = (shouldCenter: boolean): JSX.CSSProperties => shouldCenter 
    ? {
        display: 'flex',
        'justify-content': 'center'
    } : {}
      
  return (
    <div 
      style={{
        display: 'flex'
      }}
      ref={setOuterDivRef}
    >
      {
        props.edgeType === 'Round' && <div 
          style={{
            height: `${outerDivHeight()}px`,
            width: `${Math.floor(outerDivHeight()/2)}px`,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: `${outerDivHeight()-3}px`,
              width: `${outerDivHeight()-3}px`,
              'border-radius': '50%',
              'border': 'var(--solidjsSelectBorder, 2px solid LightGray)',
              ...solidjsSelectEdgeStateStyle(
                props.disabled, 
                props.solidBox && (props.selectType === 'dropdown' || props.selectType === 'switch'),
                props.opaqueEnds
              )
            }}
          />
        </div>
      }
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
          ...borderStyle(props.edgeType),
          ...props.style,
          ...solidjsSelectStateStyle(props.disabled, props.solidBox && (props.selectType === 'dropdown' || props.selectType === 'switch')),
        }}
        onMouseEnter={functions().checkToolTip}
        onMouseLeave={functions().hideToolTip}
        onPaste={functions().pasteText}
        onClick={functions().textInputClicked}
        ref={setMainDivRef}
      >
        {
          showToolTip() && caption() !== "" && toolTip()
        }
        <div
          style={{
            display: 'flex',
            'flex-direction': 'row',
            'align-items': 'center',
            width: '100%',
            height: '100%'
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
                  color: 'var(--solidjsSelectFontColor, lightgray)',
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
              height: '100%'
            }}
          >
            <div
              style={{
                flex: 1,
                'flex-basis': '100%',
                ...center(props.selectType==='switch')
              }}
            >
              {showChoices() &&
              (!props.selectType || props.selectType === 'standard') 
              ? (
                <input
                  ref={setInputRef}
                  id={'csInput' + selectId}
                  class={
                    props.disabled
                      ? props.inputDisabledClassName
                      : props.inputClassName
                  }
                  style={{
                    'margin-left': '3px',
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
                />) 
              : props.displayComponent ? (
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
                style={{
                  color: 'var(--solidjsSelectFontColor, lightgray)',
                  height: '100%',
                  'font-size':
                    'var(--solidjsSelectDropDownIconSize, small)',
                  'background-color': props.opaqueEnds
                    ? 'var(--solidjsSelectDropDownBackgroundColor, var(--solidjsSelectBackgroundColor, DarkGray))'
                    : '',
                  'background-image': props.opaqueEnds
                    ? 'var(--solidjsSelectDropDownBackgroundImage, var(--solidjsSelectBackgroundImage))'
                    : '',
                  'display': 'flex',
                  'align-items': 'center',
                  'position': 'relative',
                  ...dropdownStateStyle(props.disabled, props.dropdownIconDisabledStyle, props.dropdownIconStyle)
                }}
              > {
                  !props.hideDivider && <span style={{
                      'border-left': 'var(--solidjsSelectDropDownBorderColor,var(--solidjsSelectFontColor, lightgray)) 1px solid',
                      'height': (props.solidBox || props.opaqueEnds) && props.selectType === 'dropdown' ?  '100%' : '60%',
                      'position': 'absolute',
                      'top': (props.solidBox || props.opaqueEnds) && props.selectType === 'dropdown' ? '0' : '20%'
                    }}
                  />
                }
                {props.dropdownIcon ? (
                  <props.dropdownIcon 
                    style={{
                      'margin-left': '2px'
                    }}
                  />
                ) : (
                  <RiSystemArrowDropDownLine 
                    style={{
                      'margin-left': '2px'
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {(showChoices() || displayText() !== '') && !props.hideTitle && (
            <SolidTitle
              title={props.title}
              disabled={props.disabled}
              {...props as TitleStyle}
            />
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
                top: choiceHeight() ?? '30px',
                width: choiceWidth() ?? '-webkit-fill-available',
                overflow: 'auto',
                'border-radius': '5px',
                'z-index': 1,
                border: 'var(--solidjsSelectBorder, 2px solid LightGray)',
                'background-color':
                  'var(--solidjsSelectBackgroundColor, white)',
                'background-image': 'var(--solidjsSelectBackgroundImage)',
                ...props.choiceListStyle,
              }}
            >
              {visibleChoices().length > 0 && (
                <VirtualContainer
                  ref={setContainerRef}
                  orientation="Vertical"
                  items={visibleChoices()}
                  listSize={props.maxListHeight ?? 300}
                  onTracking={setTracking}
                  render={(item, index) => (
                    <div
                      id={`item_${index}`}
                      onMouseOver={() =>
                        functions().adjustHighlightedIndex(index)
                      }
                    >
                      {constructChoice(
                        item,
                        index,
                        selected().includes(item)
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
      </div>
      {
        props.edgeType === 'Round' && <div 
          style={{
            height: `${outerDivHeight()}px`,
            width: `${Math.floor(outerDivHeight()/2)}px`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: `${outerDivHeight()-3}px`,
              width: `${outerDivHeight()-3}px`,
              'border-radius': '50%',
              position: 'absolute',
              left: `-${Math.ceil(outerDivHeight() / 2 + 2)}px`,
              'border': 'var(--solidjsSelectBorder, 2px solid LightGray)',
              ...solidjsSelectEdgeStateStyle(
                props.disabled, 
                props.solidBox && (props.selectType === 'dropdown' || props.selectType === 'switch'),
                props.opaqueEnds
              )
            }}
          />
        </div>
      }
    </div>
  );
};

export default SolidJsSelect;
