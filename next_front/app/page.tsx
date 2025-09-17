import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to My App 🚀</h1>
        <p className="text-lg mb-6">
          Get started by logging into your account
        </p>
        <Link 
          href="/login" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}