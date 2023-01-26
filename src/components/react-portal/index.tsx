import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ReactPortalProps = {
  children: ReactNode;
  containerId?: string;
}
export default function ReactPortal({ containerId = 'portal-root', children }: ReactPortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  if (mounted) {
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', containerId);
      document.body.appendChild(container);
    }

    return ReactDOM.createPortal(children, container);
  }

  return null
}
