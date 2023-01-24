
import { Container, Footer, Overlay } from './styles';

import { ReactNode } from 'react';
import useAnimatedUnmount from '../../hooks/use-animated-unmount';
import { Button } from '../button';
import ReactPortal from '../react-portal';

type ModalProps = {
  danger?: boolean;
  visible: boolean;
  isLoading?: boolean;
  title: string;
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}
export function Modal({
  danger = false, title, children,
  cancelLabel = 'Cancelar', confirmLabel = 'Confirmar',
  onCancel, onConfirm, visible,
  isLoading = false,
}: ModalProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              // danger={danger}
              onClick={onConfirm}
            // isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
