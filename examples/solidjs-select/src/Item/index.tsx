import type { Component } from 'solid-js';
import { Horizontal, Orientation, Vertical } from '../vtypes';
import './Item.css';

export interface ItemProps {
  index: number;
  orientation: Orientation;
  variableHeight: boolean;
}
const Item: Component<ItemProps> = (props: ItemProps) => {
  const getHeight = () => {
    return props.variableHeight && props.orientation === Vertical
      ? 40 + (props.index % 5) * 10
      : '40px';
  };

  const getWidth = () => {
    return props.variableHeight && props.orientation === Horizontal
      ? 40 + (props.index % 5) * 10
      : '40px';
  };

  return (
    <div class="item">
      <img
        height={getHeight()}
        width={getWidth()}
        alt={props.index.toString()}
        src={`https://picsum.photos/id/${(props.index % 10) + 1}/200/300`}
      />
      <pre>Item {props.index}</pre>
    </div>
  );
};

export default Item;
