import { createSignal, JSX } from 'solid-js';
import VerticalMenu from '../VerticalMenu/VerticalMenu';
import { guides, GuideItem } from './Guides';
import './HowTo.css';

const HowTo = () => {
  const [guide, setGuide] = createSignal<string>('');

  const constructGuide = (demoName: string): JSX.Element => {
    const guideItem: GuideItem | undefined = guides.find(
      (cat) => cat.name === demoName
    );
    return guideItem ? guideItem?.guide() : <div></div>;
  };

  return (
    <div class="how-to">
      <VerticalMenu
        title="Guides"
        options={guides.map((g) => g.name)}
        onSelect={setGuide}
      />
      <div class="guides">{guide() && constructGuide(guide())}</div>
    </div>
  );
};

export default HowTo;
