"use client";

import { useFormStatus } from "react-dom";

interface PendingProps {
  children: React.ReactNode;
}

// Este componente puede ser usado en cualquier componente, cliente o servidor
// dentro de cualquier <form></form> que reciba una "action" por la prop "action"
// nota: puede ser sustituido por useActionState (la prop isPending) en client components
export default function Pending({ children }: PendingProps) {
  const { pending } = useFormStatus();

  return pending && children;
}
