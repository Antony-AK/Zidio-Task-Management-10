import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../../utils/api";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const authContext = useAuth();
console.log("Auth Context:", authContext);


  const handleSummit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      let response;
      if (isLogin) {
        response = await loginUser({ email, password });
      } else {
        response = await signupUser({ name, email, password });
      }

      login(response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen border ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          {isLogin ? "Welcome Back!" : "Join Us!"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isLogin ? "Sign in to continue" : "Create an account"}
        </p>
        {error && <p className="text-red-600" >{error}</p>}
        <form onSubmit={handleSummit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
              onChange={(e)=> setEmail(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
              onChange={(e)=> setPassword(e.target.value)}
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
