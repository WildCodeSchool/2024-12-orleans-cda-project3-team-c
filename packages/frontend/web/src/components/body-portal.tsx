import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function BodyPortal({ children }: PropsWithChildren) {
  return createPortal(children, document.body);
}
