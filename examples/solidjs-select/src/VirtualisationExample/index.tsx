import { Component, createSignal, JSX } from 'solid-js';
import './VirtualisationExample.css';
import Item from '../Item';
import VirtualContainer from 'solidjs-virtualisation';
import { Horizontal, Orientation, Vertical } from '../vtypes';

const items: number[] = [];
for (let index = 1; index <= 1000000; index++) {
  items.push(index);
}

const VirtualisationExample = () => {
  const [orientation, setHorizontal] = createSignal<Orientation>(Vertical);
  const [size, setSize] = createSignal<'Fixed' | 'Variable'>('Fixed');

  const orientationChanged = () => {
    setHorizontal(orientation() === Vertical ? Horizontal : Vertical);
  };

  const sizeChanged = () => {
    setSize(size() === 'Fixed' ? 'Variable' : 'Fixed');
  };

  const contentStyle = () =>
    orientation() === Horizontal
      ? {
          width: '400px',
        }
      : {
          height: '400px',
        };

  return (
    <div class="main">
      <p onClick={orientationChanged}>
        {orientation()} orientation (click to change)
      </p>
      <p onClick={sizeChanged}>{size()} size (click to change)</p>
      <div style={contentStyle()}>
        <VirtualContainer
          orientation={orientation()}
          items={items}
          render={(item) => (
            <Item
              index={item}
              orientation={orientation()}
              variableHeight={size() === 'Variable'}
            />
          )}
        />
      </div>
    </div>
  );
};

export default VirtualisationExample;