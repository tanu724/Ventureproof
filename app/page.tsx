export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center p-8">

      <h1 className="text-6xl font-bold mb-6">
        VentureProof
      </h1>

      <p className="text-xl max-w-3xl mb-8">
        AI-powered startup validation platform
        for students, universities, mentors,
        and investors.
      </p>

      <a
        href="/auth"
        className="bg-white text-black px-8 py-4 rounded"
      >
        Get Started
      </a>

    </div>
  );
}