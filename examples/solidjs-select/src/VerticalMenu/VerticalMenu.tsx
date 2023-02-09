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
  const [active, setActive] = createSignal<string>(options[0]);

  return (
    <div class="vmenu">
      <h3 class="vmenu-heading">{title}</h3>
      <ul class="vmenu-items">
        {options.map((option) => (
          <li
            class={option === active() ? "active-option" : "option"}
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
  );
};

export default VerticalMenu;
