import { Component, createEffect, createSignal, JSX, onMount } from 'solid-js';
import './VirtualisationExample.css';
import Item from '../Item';
import VirtualContainer from "solidjs-virtualisation"
import { Horizontal, Orientation, Vertical } from '../vtypes';


export interface VirtualisationExampleProps {
  theme: string;
}

const VirtualisationExample: Component<VirtualisationExampleProps> = (
  props: VirtualisationExampleProps
) => {
  const [orientation, setHorizontal] = createSignal<Orientation>(Vertical);
  const [size, setSize] = createSignal<'Fixed' | 'Variable'>('Fixed');
  const [items, setItems] = createSignal<number[]>([])
  const [itemCount, setItemCount] = createSignal<number>(10000000)
  const orientationChanged = () => {
    setHorizontal(orientation() === Vertical ? Horizontal : Vertical);
  };

  onMount(() => {
    createItems(10000000);
  });

  createEffect(() => {
    console.log(`theme = ${props.theme}`); //refresh
    setTimeout( () => {
      orientationChanged();
      orientationChanged();
    },1)
  });

  const createItems = (count: number) => {
    if( Number.isNaN(count) || count === 0) {
      return;
    }
    if( count > 10000000) {
      count = 10000000;
    }
    setItemCount(count);
    const items: number[] = [];
    for (let index = 1; index <= count; index++) {
      items.push(index);
    }
    setItems(items);
  };

  const sizeChanged = () => {
    setSize(size() === 'Fixed' ? 'Variable' : 'Fixed');
  };

  const contentStyle = () =>
    orientation() === Horizontal
      ? {
          width: '500px',
          height: "80px"
        }
      : {
          height: '500px',
          "width": "200px"
        };

  return (
    <div class='main'>
      <div class='settings'>
        <div class='columns'>
          <p class='entry'>Orientation</p>
          <p class='entry'>Item Size</p>
          <p class='entry'>Item count</p>
        </div>
        <div class='columns'>
          <p class='entryValue' onClick={orientationChanged}>{orientation()}</p>
          <p class='entryValue' onClick={sizeChanged}>{size()}</p>
          <input 
            class='entryInput' 
            type="number" 
            min="1" 
            max="10000000"
            value={itemCount()}
            onChange={e => createItems(Number((e.target as HTMLInputElement).value))}
          />
        </div>
      </div>
      <div class='containerCenter'>
        <div style={contentStyle()}>
          <VirtualContainer
            orientation={orientation()}
            items={items()}
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
    </div>
  );
};

export default VirtualisationExample;