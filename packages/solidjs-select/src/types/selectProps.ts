import { Choice } from './choice';

export interface SelectProps<T extends Choice | object | string> {
  title: string; //select title and key for cache
  maximumSelections?: number; //min items that can be selected
  minimumSelections?: number; //max items that can be selected
  selectType?: 'standard' | 'dropdown' | 'switch'; //how the control behaves
  choices?: T[]; //available static choices
  selected?: T[] | T; //currently selected items
  itemValue?: (item: T) => string; //if using a complex class the key value
  itemText?: (item: T) => string; //if using a complex class the display value
  itemDisabled?: (item: T) => boolean; //If using a complex class the disabled value
  typeAheadLookUp?: (text: string, selected: T[]) => Promise<T[]>; //type ahead lookup call
  noEmptyStringLookUp?: boolean; //don't loook up if input is blank
  itemSearch?: (items: string[]) => Promise<T[]>; //item search for clipboard paste
  cacheLookUp?: boolean; //should cache items
  cacheTimeToLive?: number; //how long should items exist for in seconds
  cacheExpiryCheck?: number; //how often should item expiry be checked in seconds
  onChange?: (selected: T[]) => void; //notify of change
  disabled?: boolean; // is control disable
  loadingText?: string; //custom loading text
  noItemText?: string; //custom no item text
  caseSensitive?: boolean; //perform case sensitive matching
  toolTipValueLimit?: number; //Maxium number of items to display
  hideListOnSelect?: boolean; //automatically hide the option list when an Item is selected/deselected
  clearInputOnSelect?: boolean; //clear input text if an item is selcted
  maxListHeight?: number;
  itemSize?: number;
}
