"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Analysis = {
  startup: string;
  innovationScore: number;
  marketPotential: string;
  feasibility: string;
  risk: string;
  fundingReadiness: string;
  recommendation: string;
};

export default function DashboardPage() {

  const [userEmail, setUserEmail] =
    useState("");

  const [idea, setIdea] =
    useState("");

  const [problem, setProblem] =
    useState("");

  const [analysis, setAnalysis] =
    useState<Analysis | null>(
      null
    );


  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {

    const {
      data,
    } =
      await supabase.auth.getUser();

    if (data.user) {
      setUserEmail(
        data.user.email || ""
      );
    }
  };


  const signOut = async () => {
    await supabase.auth.signOut();

    window.location.href =
      "/auth";
  };


  const handleSubmit =
    async () => {

      await supabase
        .from("ideas")
        .insert([
          {
            idea,
            problem,
          },
        ]);


      const response =
        await fetch(
          "/api/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify(
                {
                  idea,
                  problem,
                }
              ),
          }
        );


      const data =
        await response.json();

      setAnalysis(
        data.analysis
      );
    };


  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          VentureProof Dashboard
        </h1>

        <button
          onClick={signOut}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Sign Out
        </button>

      </div>


      <p className="mb-8">
        Logged in as:
        {" "}
        {userEmail}
      </p>


      <div className="space-y-6">

        <input
          value={idea}
          className="w-full border p-4 bg-black"
          placeholder="Startup Idea"
          onChange={(e) =>
            setIdea(
              e.target.value
            )
          }
        />


        <textarea
          value={problem}
          rows={6}
          className="w-full border p-4 bg-black"
          placeholder="Problem Statement"
          onChange={(e) =>
            setProblem(
              e.target.value
            )
          }
        />


        <button
          className="bg-white text-black px-6 py-3 rounded"
          onClick={
            handleSubmit
          }
        >
          Analyze Startup
        </button>


        {analysis && (
          <div className="border p-6 space-y-3">

            <p>
              Startup:
              {" "}
              {analysis.startup}
            </p>

            <p>
              Innovation:
              {" "}
              {analysis.innovationScore}/10
            </p>

            <p>
              Market:
              {" "}
              {analysis.marketPotential}
            </p>

            <p>
              Feasibility:
              {" "}
              {analysis.feasibility}
            </p>

            <p>
              Risk:
              {" "}
              {analysis.risk}
            </p>

            <p>
              Funding:
              {" "}
              {analysis.fundingReadiness}
            </p>

            <p>
              Recommendation:
              {" "}
              {analysis.recommendation}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}