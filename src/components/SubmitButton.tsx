"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SubmitButton({ text1, text2 }: { text1?: string; text2?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? text2 || "Signing up..." : text1 || "Create an account"}
    </Button>
  );
}