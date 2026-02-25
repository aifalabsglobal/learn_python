import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-3xl font-bold">
            <span className="text-blue-200">ai</span>
            <span className="text-white">fa</span>
          </span>
          <p className="text-blue-200 text-sm mt-1">Learning Platform</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
