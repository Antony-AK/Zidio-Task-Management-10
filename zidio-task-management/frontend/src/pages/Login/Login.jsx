import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen border ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          {isLogin ? "Welcome Back!" : "Join Us!"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isLogin ? "Sign in to continue" : "Create an account"}
        </p>
        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <button
            type="submit"
            className="w-full bg-orange text-white p-3 rounded-lg font-semibold hover:bg-orange transition-all"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          {isLogin ? "New here? " : "Already have an account? "}
          <span
            className="text-orange cursor-pointer font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
