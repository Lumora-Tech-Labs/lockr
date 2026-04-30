import { SignOutButton } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
        <p className="text-slate-400 mb-6">You will be redirected shortly.</p>
        <SignOutButton />
      </div>
    </div>
  );
}