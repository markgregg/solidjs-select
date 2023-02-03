import { createSignal, JSX } from 'solid-js';
import VerticalMenu from '../VerticalMenu/VerticalMenu';
import { categories } from './Demos';
import './Examples.css';

const Examples = () => {
  const [demo, setDemo] = createSignal<string>(categories[0].name);

  const constructDemo = (demoName: string): JSX.Element => {
    const category = categories.find((cat) => cat.name === demoName);
    return category ? category?.demo() : <div></div>;
  };

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
        onSelect={setDemo}
      />
      <div class="controls">{demo && constructDemo(demo())}</div>
    </div>
  );
};

export default Examples;
