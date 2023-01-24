import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ReactPortalProps = {
  children: ReactNode;
  containerId?: string;
}
export default function ReactPortal({ containerId = 'portal-root', children }: ReactPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
