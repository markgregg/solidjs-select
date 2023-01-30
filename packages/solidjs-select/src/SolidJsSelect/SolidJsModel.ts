import { JSX } from 'solid-js';
import { Cache } from '../cache/cache';
import { errorMessage } from '../utils/utils';
import { generateGuid } from '../utils/guidGenerator';
import { Choice, SelectProps } from '../types';

export interface SolidJsSelectFunctions<T extends Choice | object | string> {
  getItemText: (item: T) => string;
  getItemValue: (item: T) => any;
  getItemValueString: (item: T) => string;
  isDisabled: (item: T) => boolean;
  toolTipLimit: () => number;
  onChange: (items: T[]) => void;
  fetchChoices: (text: string) => void;
  shouldFilter: (item: T) => boolean;
  getVisibleChoices: () => T[];
  updateDisplayText: () => void;
  updateVisibleChoices: () => void;
  updateChoices: (items: T[]) => void;
  updateSelected: () => void;
  hideList: () => void;
  showList: () => void;
  clickedAway: (mouseEvent: MouseEvent) => void;
  textInputClicked: () => void;
  textChanged: (event: Event) => void;
  selectItem: (item: T) => void;
  deselectItem: (item: T) => void;
  makeItemVisible: (index: number) => void;
  findNextEnabled: (index: number) => number;
  findPrevEnabled: (index: number) => number;
  adjustHighlightedIndex: (index: number) => void;
  inputKeyPressed: (event: KeyboardEvent) => void;
  pasteText: (event: ClipboardEvent) => void;
  checkToolTip: () => void;
  hideToolTip: () => void;
  clearSelection: (event: MouseEvent) => void;
  getDisplayText: (selection: T[]) => string;
  getCaption: (selection: T[]) => string;
  getMatchItem: (item: T) => string;
}

const defaultToolTipLimit = 20;

export const createSolidJsSelectFunctions = <
  T extends Choice | object | string
>(
  props: SelectProps<T>,
  selectId: string,
  setCaption: (value: string) => void,
  setDisplayText: (value: string) => void,
  inputText: () => string,
  setInputText: (value: string) => void,
  showChoices: () => boolean,
  setShowChoices: (value: boolean) => void,
  setShowToolTip: (value: boolean) => void,
  selected: () => T[],
  setSelected: (value: T[]) => void,
  visibleChoices: () => T[],
  setVisibleChoices: (value: T[]) => void,
  lookedUpChoices: () => T[] | undefined,
  setLookedUpChoices: (value: T[] | undefined) => void,
  highlightedIndex: () => number,
  setHighlightedIndex: (value: number) => void,
  token: () => string,
  setToken: (value: string) => void,
  cache: () => Cache<T> | undefined,
  setPosition: (value?: number) => void
): SolidJsSelectFunctions<T> => {
  const functions: SolidJsSelectFunctions<T> = {
    getItemText: (item: T): string => {
      try {
        return (
          (item as Choice).text ??
          (props.itemText ? props.itemText(item) : (item as string))
        );
      } catch (error) {
        console.log(
          `Object type either does not implement Choice, the property getters (itemText | itemValue) or is not a string, error: ${errorMessage(
            error
          )}`
        );
      }
      return '';
    },

    getItemValue: (item: T): any => {
      try {
        return (
          (item as Choice).value ??
          (props.itemValue ? props.itemValue(item) : item)
        );
      } catch (error) {
        console.log(
          `Object type either does not implement Choice, the property getter (itemText) or is not a string, error: ${errorMessage(
            error
          )}`
        );
      }
      return '';
    },

    //returns value of an item
    getItemValueString: (item: T): string => {
      try {
        const value =
          (item as Choice).value ??
          (props.itemValue ? props.itemValue(item) : item);
        return typeof value === 'string' ? value : value.toString();
      } catch (error) {
        console.log(
          `Object type either does not implement Choice, the property getter (itemValue) or is not a string, error: ${errorMessage(
            error
          )}`
        );
      }
      return '';
    },

    //returns disabled property of an item
    isDisabled: (item: T): boolean => {
      try {
        return (
          (item as Choice).disabled ??
          (props.itemDisabled ? props.itemDisabled(item) : false)
        );
      } catch (error) {
        console.log(
          `Object type either does not implement Choice, the property getter (disabled) or is not a string, error: ${errorMessage(
            error
          )}`
        );
      }
      return false;
    },

    toolTipLimit: (): number => {
      return props.toolTipValueLimit ?? defaultToolTipLimit;
    },

    onChange: (items: T[]) => {
      if (props.onChange) {
        props.onChange([...items]);
      }
    },

    fetchChoices: (text: string) => {
      if (
        props.typeAheadLookUp &&
        (text !== '' || !props.noEmptyStringLookUp)
      ) {
        setLookedUpChoices(undefined);
        //if use cache then check if we have items
        if (cache()) {
          try {
            const cachedItems = cache()?.getCachedItems(text);
            if (cachedItems) {
              functions.updateChoices(cachedItems);
              return;
            }
          } catch (error) {
            console.log(
              `Failed to fetch items from cache, reason: ${errorMessage(error)}`
            );
          }
        }
        const guid = generateGuid();
        setToken(guid);
        //look item lookup
        props.typeAheadLookUp(text, selected()).then((items) => {
          try {
            //if use cache then cache items
            if (cache()) {
              cache()?.cacheItems(text, items);
            }
            //if call is current call set items
            if (guid === token()) {
              functions.updateChoices(items);
            }
          } catch (error) {
            console.log(
              `Failed to fetch items from item source, reason: ${errorMessage(
                error
              )}`
            );
          }
        });
      }
    },

    //check if item should be filtered
    shouldFilter: (item: T): boolean => {
      return functions
        .getMatchItem(item)
        .includes(
          !props.caseSensitive ? inputText()?.toLowerCase() : inputText()
        );
    },

    //determine visible choices based on available choices and what is selected
    getVisibleChoices: (): T[] => {
      try {
        //if not lookup choices availale and no choices supplied show selected items
        if (!lookedUpChoices() && !props.choices) {
          return selected();
        }

        //filter out selected items and items that do not contain text input
        return selected()
          .filter((item) => !inputText() || functions.shouldFilter(item))
          .concat(
            (lookedUpChoices() ?? props.choices ?? []).filter(
              (item) =>
                selected().indexOf(item) === -1 &&
                (!inputText() || functions.shouldFilter(item))
            )
          );
      } catch (error) {
        console.log(
          `Failed to get visible choices, reason: ${errorMessage(error)}`
        );
      }
      return [];
    },

    //updates the text shown to user
    updateDisplayText: () => {
      try {
        //show the currently selected item or number of selected items
        setDisplayText(functions.getDisplayText(selected()));
        setCaption(functions.getCaption(selected()));
      } catch (error) {
        console.log(
          `Failed to fetch update display text, reason: ${errorMessage(error)}`
        );
      }
    },

    //updates the visible item state
    updateVisibleChoices: () => {
      const choices = functions.getVisibleChoices();
      setVisibleChoices(choices);
      if (visibleChoices().length === 0) {
        functions.adjustHighlightedIndex(-1);
      } else if (highlightedIndex() >= visibleChoices().length) {
        functions.adjustHighlightedIndex(visibleChoices().length - 1);
      } else if (highlightedIndex() === -1) {
        functions.adjustHighlightedIndex(0);
      }
      functions.updateDisplayText();
    },

    //updates the available choices from a lookup and calls visible choice update
    updateChoices: (items: T[]) => {
      setLookedUpChoices(items);
      functions.updateVisibleChoices();
    },

    //calls parent notifier and visible choice update
    updateSelected: () => {
      functions.onChange(selected());
      functions.updateVisibleChoices();
    },

    //hides the list and clears the input choices
    hideList: () => {
      setShowChoices(false);
    },

    //shows the list and sets the highlighted index to -1
    showList: () => {
      setLookedUpChoices(undefined);
      setInputText('');
      functions.updateVisibleChoices();
      setShowChoices(true);
      functions.adjustHighlightedIndex(visibleChoices().length > 0 ? 0 : -1);
      functions.hideToolTip();
    },

    //document click handler
    clickedAway: (mouseEvent: MouseEvent) => {
      if (!showChoices()) {
        return;
      }
      try {
        //get the control
        const input = document.getElementById('csInput' + selectId);
        const list = document.getElementById('csList' + selectId);
        //check if the click was outside the controls area
        if (
          mouseEvent.target !== null &&
          !input?.contains(mouseEvent.target as Node) === true &&
          !list?.contains(mouseEvent.target as Node) === true
        ) {
          functions.hideList();
        }
      } catch (error) {
        console.log(
          `Failed to handle click away, reason: ${errorMessage(error)}`
        );
      }
    },

    //hanlder for clicking on the control
    textInputClicked: () => {
      if (props.disabled) {
        return;
      }
      //if list already shown do nothing.
      if (showChoices()) {
        return;
      }

      //if behaving as a switch move to the next item in the list
      if (props.selectType === 'switch') {
        try {
          if (props.choices) {
            var index =
              selected().length > 0
                ? props.choices.indexOf(selected()[0]) + 1
                : 0;
            if (index + 1 > props.choices.length) {
              index = 0;
            }
            setSelected([props.choices[index]]);
            functions.updateSelected();
          }
        } catch (error) {
          console.log(
            `Failed to switch to next item, reason: ${errorMessage(error)}`
          );
        }
        return;
      }
      //clear the input text
      setInputText('');
      //if items lookup provided then call it for default otherwise update visible choices.
      if (props.typeAheadLookUp) {
        functions.fetchChoices('');
      } else {
        functions.updateVisibleChoices();
      }
      //show the item list
      functions.showList();
    },

    //called when text entered into the input control
    textChanged: (event: Event) => {
      //update text
      const text = (event.target as HTMLInputElement).value;
      setInputText(text);
      //if items lookup provided call it otherwise call updateVisiblechoices to filter items base on text
      if (props.typeAheadLookUp) {
        functions.fetchChoices(text);
      } else {
        functions.updateVisibleChoices();
      }
    },

    //called when a choice is clicked.
    selectItem: (item: T) => {
      //if only 1 item allow and list a dropdown, close it
      if (
        (props.maximumSelections === 1 &&
          (props.minimumSelections === 1 || props.selectType === 'dropdown')) ||
        props.hideListOnSelect
      ) {
        functions.hideList();
      }
      //if no maxium selections or number of selected items less than max, select the item
      if (
        !props.maximumSelections ||
        selected().length < props.maximumSelections
      ) {
        selected().push(item);
        setSelected([...selected()]);
        functions.updateSelected();
        //if a max of 1 item then selected only this item
      } else if (props.maximumSelections === 1) {
        setSelected([item]);
        functions.updateSelected();
      }
    },

    //called when a selected item is clicked
    deselectItem: (item: T) => {
      try {
        // if the selected items greater than minimum then deslect
        if (selected().length > (props.minimumSelections ?? 0)) {
          const idx = selected().indexOf(item);
          selected().splice(idx, 1);
          setSelected([...selected()]);
          if (props.hideListOnSelect) {
            functions.hideList();
          }
          functions.updateSelected();
        }
      } catch (error) {
        console.log(
          `Failed to de selecte item, reason: ${errorMessage(error)}`
        );
      }
    },

    //called when clear all selected items clicked.
    clearSelection: (event: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      setSelected([]);
      functions.updateSelected();
      event.stopPropagation();
    },

    //makes highlighted item visible
    makeItemVisible: (index: number) => {
      setPosition(index);
      setPosition(undefined);
    },

    findNextEnabled: (index: number): number => {
      while (
        index < visibleChoices().length &&
        functions.isDisabled(visibleChoices()[index])
      )
        index++;
      return index;
    },

    findPrevEnabled: (index: number): number => {
      while (index > 0 && functions.isDisabled(visibleChoices()[index]))
        index--;
      return index;
    },

    //updates the highlighted item index
    adjustHighlightedIndex: (index: number) => {
      if (index !== -1) {
        functions.makeItemVisible(index);
      }
      setTimeout(() => {
        setHighlightedIndex(index);
      }, 10);
    },

    //called when a key is pressed
    inputKeyPressed: (event: KeyboardEvent) => {
      try {
        switch (event.code) {
          case 'ArrowDown':
            //if the highlited item less than max move down
            if (showChoices() && visibleChoices().length > 0) {
              const index =
                highlightedIndex() === -1 ||
                highlightedIndex() >= visibleChoices().length - 1
                  ? functions.findNextEnabled(0)
                  : functions.findNextEnabled(highlightedIndex() + 1);
              functions.adjustHighlightedIndex(index);
            }
            event.preventDefault();
            break;
          case 'ArrowUp':
            //if the highlited item greater than 0 move up
            if (showChoices() && visibleChoices().length > 0) {
              const index =
                highlightedIndex() <= 0
                  ? functions.findPrevEnabled(visibleChoices().length - 1)
                  : functions.findPrevEnabled(highlightedIndex() - 1);
              functions.adjustHighlightedIndex(index);
            }
            event.preventDefault();
            break;
          case 'Home':
            //move to start
            if (showChoices() && visibleChoices().length > 0) {
              const index = functions.findNextEnabled(0);
              functions.adjustHighlightedIndex(index);
            }
            event.preventDefault();
            break;
          case 'End':
            //move to end
            if (showChoices() && visibleChoices().length > 0) {
              const index = functions.findPrevEnabled(
                visibleChoices().length - 1
              );
              functions.adjustHighlightedIndex(index);
            }
            event.preventDefault();
            break;
          case 'NumpadEnter':
          case 'Enter':
            //select item
            if (
              highlightedIndex() > -1 &&
              highlightedIndex() < visibleChoices().length
            ) {
              if (
                selected().indexOf(visibleChoices()[highlightedIndex()]) === -1
              ) {
                functions.selectItem(visibleChoices()[highlightedIndex()]);
              } else {
                functions.deselectItem(visibleChoices()[highlightedIndex()]);
              }
              if (props.clearInputOnSelect) {
                setInputText('');
              }
            }
            event.preventDefault();
            break;
        }
      } catch (error) {
        console.log(
          `Failed to hanle key press, reason: ${errorMessage(error)}`
        );
      }
    },

    pasteText: (event: ClipboardEvent) => {
      try {
        const text = event.clipboardData?.getData('text');
        if (!text || text.indexOf(',') === -1) {
          return;
        }
        event.preventDefault();

        //get items from text, if not checking case convert to lower case
        const items = text.split(',').map((s) => s.trim());
        if (props.choices && props.choices.length > 0) {
          //if we have choices then search choices
          const searchItems = !props.caseSensitive
            ? items.map((s) => s.toLowerCase())
            : items;
          const selectedItems = selected().concat(
            props.choices.filter(
              (item) =>
                searchItems.indexOf(
                  !props.caseSensitive
                    ? functions.getItemValueString(item).toLowerCase()
                    : functions.getItemValueString(item)
                ) !== -1 && selected().indexOf(item) === -1
            )
          );
          if (
            props.maximumSelections &&
            selectedItems.length >= props.maximumSelections
          ) {
            selectedItems.splice(props.maximumSelections);
          }
          setSelected(selectedItems);
          functions.updateSelected();
        } else if (props.itemSearch) {
          //otherwise if we have a func to call, call it
          props.itemSearch(items).then((foundItems) => {
            const selectedItems = selected().concat(
              foundItems.filter(
                (item) =>
                  !selected().find(
                    (sel) =>
                      functions.getItemValue(sel) ===
                      functions.getItemValue(item)
                  )
              )
            );
            if (
              props.maximumSelections &&
              selectedItems.length >= props.maximumSelections
            ) {
              selectedItems.splice(props.maximumSelections);
            }
            setSelected(selectedItems);
            functions.updateSelected();
          });
        }
      } catch (error) {
        console.log(`Failed to paste items, reason: ${errorMessage(error)}`);
      }
    },

    checkToolTip: () => {
      if (!showChoices()) {
        setShowToolTip(true);
      }
    },

    hideToolTip: () => {
      setShowToolTip(false);
    },

    getDisplayText: (selection: T[]): string => {
      try {
        return selection.length > 1
          ? `${selection.length} items`
          : selection.length === 1
          ? functions.getItemText(selection[0])
          : '';
      } catch (error) {
        console.log(
          `Failed to fetch display text, reason: ${errorMessage(error)}`
        );
        return '';
      }
    },

    getCaption: (selection: T[]): string => {
      try {
        return selection.length > 1
          ? selection
              .slice(0, functions.toolTipLimit())
              .map((item) => functions.getItemText(item))
              .join(', ') +
              (selection.length > functions.toolTipLimit()
                ? ` + ${selection.length - functions.toolTipLimit()} more items`
                : '')
          : '';
      } catch (error) {
        console.log(
          `Failed to fetch caption text, reason: ${errorMessage(error)}`
        );
        return '';
      }
    },

    getMatchItem: (item: T): string => {
      return !props.caseSensitive
        ? functions.getItemText(item).toLowerCase()
        : functions.getItemText(item);
    },
  };

  return functions;
};
