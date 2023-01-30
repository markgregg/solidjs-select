import { createSignal } from 'solid-js';
import './App.css';

interface ClipboardCopyProps {
  text: string;
}

export const ClipboardCopy = (props: ClipboardCopyProps) => {
  const [copied, setCopied] = createSignal('Click to copy');
  return (
    <div
      class="clipboardCopy"
      onClick={() => {
        navigator.clipboard.writeText(props.text);
        setCopied('Copied');
      }}
    >
      {copied}
    </div>
  );
};
