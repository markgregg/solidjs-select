import { Component, createSignal } from 'solid-js';
import './VerticalMenu.css';

interface VerticalMenuProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

const VerticalMenu: Component<VerticalMenuProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [active, setActive] = createSignal<string>();
  const [highlight, setHighlight] = createSignal<string>();

  return (
    <div class="vmenu">
      <h3 class="vmenu-heading">{title}</h3>
      <ul class="vmenu-items">
        {options.map((option) => (
          <li
            class="option"
            style={{
              'background-color':
                highlight() === option || option === active()
                  ? 'var(--pageColor3)'
                  : 'var(--pageColor2)',
            }}
            onMouseEnter={() => setHighlight(option)}
            onMouseLeave={() => setHighlight(undefined)}
            onClick={() => {
              setActive(option);
              onSelect(option);
            }}
          >
            <p>{option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalMenu;
