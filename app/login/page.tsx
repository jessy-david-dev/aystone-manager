"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) window.location.replace("/dashboard");
    else signIn("discord", { callbackUrl: "/dashboard" });
  }, [session]);

  return <p className="p-8 text-center">Redirection vers Discord…</p>;
}