import { Component, JSX } from 'solid-js';
import './HowTo.css';

type GuideEntry = {
  type: 'h3' | 'h4' | 'h5' | 'h6' | 'p' | '*' | 'code';
  text: string;
  class?: string;
};

interface GuideProperties {
  title: string;
  entries: GuideEntry[];
}

const Guide: Component<GuideProperties> = ({ title, entries }) => {
  return (
    <div class="guide">
      <h2 class="guide-title">{title}</h2>
      <div class="guide-body">
        {entries.map((entry) => {
          switch (entry.type) {
            case 'h3':
              return <h3 class={entry.class}>{entry.text}</h3>;
            case 'h4':
              return <h4 class={entry.class}>{entry.text}</h4>;
            case 'h5':
              return <h5 class={entry.class}>{entry.text}</h5>;
            case 'h6':
              return <h6 class={entry.class}>{entry.text}</h6>;
            case '*':
              return (
                <p class={`indent tight ${entry.class}`}>
                  <b class="bullet">&#x2022;</b>
                  <em>{entry.text}</em>
                </p>
              );
            case 'code':
              return <div class={`code ${entry.class}`}></div>;
            default:
              return <p>{entry.text}</p>;
          }
        })}
      </div>
    </div>
  );
};

export interface GuideItem {
  name: string;
  guide: () => JSX.Element;
}

export const guides: GuideItem[] = [
  {
    name: 'Binding',
    guide: () => (
      <Guide
        title="Binding"
        entries={[
          {
            type: 'h3',
            text: 'Overview',
          },
          {
            type: 'p',
            text: 'The CompactSelect control is generic, but binding should be straight forward, and it should be possible for the type of the objects being bound to a control to be intferred. If the bound array is of strings, or an array of objects that supports the Choice interface, then there will be nothing to do (see below).',
          },
          {
            type: 'code',
            text: `
                  <CompactSelect
                    title="test"
                    choices={choices}
                  />
              `,
          },
          {
            type: 'p',
            text: 'If an array of object is supplied that are not strings and does not support the Choice interface, then the following properties are required.',
          },
          {
            type: '*',
            text: 'itemText, informs the control how to get display text for an item.',
          },
          {
            type: '*',
            text: 'itemValue, informs the control how to get the items value.',
          },
          {
            type: '*',
            text: 'disabled, is used to inform the control that an item cannot be selected.',
          },
          {
            type: 'code',
            text: `
              <CompactSelect
                title="test"
                choices={objectChoices}
                itemValue={(item) => item.name} 
                itemText={(item) => item.name}
                itemDisabled={(item) => item.disabled}
              />
            `,
            class: 'top-space',
          },
        ]}
      />
    ),
  },
];
