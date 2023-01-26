
import useAnimatedUnmount from '../../hooks/use-animated-unmount';
import ReactPortal from '../react-portal';
import Spinner from '../spinner';
import { Overlay } from './styles';

type LoaderProps = {
  isLoading: boolean;
}
export default function Loader({ isLoading }: LoaderProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal>
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
