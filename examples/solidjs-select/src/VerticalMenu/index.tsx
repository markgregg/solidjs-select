import { Component, createSignal } from 'solid-js';
import './VerticalMenu.css';

interface VerticalMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

const VerticalMenu: Component<VerticalMenuProps> = ({
  options,
  onSelect,
}) => {
  const [active, setActive] = createSignal<string>(options[0]);

  return (
    <div class="menu-border">
      <div class="vmenu">
        <ul>
          {options.map((option) => (
            <li
              class={option === active() ? "active-option" : ""}
              onClick={() => {
                setActive(option);
                onSelect(option);
              }}
            >
              <p class='vmenu-text'>{option}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VerticalMenu;
