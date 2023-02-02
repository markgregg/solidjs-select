export interface ChoiceProps<T extends object | string> {
  item: T;
  index: number;
  highlightedIndex: () => number;
  isSelected: boolean;
  itemText?: (item: T) => string;
  onItemClicked: (item: T) => void;
  choiceDisabled?: boolean;
}
