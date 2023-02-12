import { createSignal, JSX } from 'solid-js';
import VerticalMenu from '../VerticalMenu/VerticalMenu';
import { categories } from './Demos';
import './Examples.css';

const Examples = () => {
  const [demo, setDemo] = createSignal<string>(categories[0].name);
  const [state, setState] = createSignal<number>(0);

  const constructDemo = (demoName: string): JSX.Element => {
    const category = categories.find((cat) => cat.name === demoName);
    return category ? category?.demo() : <div></div>;
  };

  const selectDemo = (demo: string) => {
    setState(1);
    setTimeout(() => {
      setDemo(demo);
      setState(2);
    }, 900);
  }

  return (
    <div
      class="examples"
      style={{
        color: 'var(--pageFont)',
      }}
    >
      <VerticalMenu
        title="Catagories"
        options={categories.map((c) => c.name)}
        onSelect={selectDemo}
      />
      <div class="controls">
        <div 
          class="curtain"
          style={state() === 1 
            ? { animation: 'clearForm 1s' }
            : state() === 2 
              ? { animation: 'showForm 1s' }
              : undefined
          }
        />
        {demo && constructDemo(demo())}
      </div>
    </div>
  );
};

export default Examples;
