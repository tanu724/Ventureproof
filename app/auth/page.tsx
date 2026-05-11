"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");

  const signIn = async () => {

    const { error } =
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            "http://localhost:3000/dashboard",
        },
      });

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    alert(
      "Magic link sent. Check your email."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">

      <div className="space-y-4">

        <h1 className="text-3xl font-bold">
          VentureProof Login
        </h1>

        <input
          type="email"
          placeholder="Student email"
          className="border p-3 bg-black"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="bg-white text-black px-6 py-3 rounded"
          onClick={signIn}
        >
          Sign In
        </button>

      </div>

    </div>
  );
}