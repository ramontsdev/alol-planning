import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ReactPortalProps = {
  children: ReactNode;
}
const ReactPortal = ({ children }: ReactPortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children,
      document.querySelector("#myportal")!)
    : null
}

export default ReactPortal
