import { useState } from "react";
import { loginUser, signupUser } from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!data.email || !data.password) {
    return alert("All fields are required");
  }

  if (!isLogin) {
    if (!data.confirmPassword) {
      return alert("Confirm password is required");
    }
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }
  }

  const res = isLogin
    ? await loginUser(data)
    : await signupUser(data);

if (res.token) {
  toast.success(isLogin ? "Login successful 🎉" : "Account created 🎉");

  localStorage.setItem("token", res.token);
  localStorage.setItem("email", data.email);

  setTimeout(() => {
    window.location.href = "/dashboard";
  }, 1000);
} else {
  toast.error(res.error || "Something went wrong");
}
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7]">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          {isLogin
            ? "Sign in to manage your tasks"
            : "Get started with your task management"}
        </p>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Email Address
  </label>
  <input
    type="email"
    required
    value={data.email}
    placeholder="you@example.com"
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
    onChange={(e) =>
      setData({ ...data, email: e.target.value })
    }
  />
</div>

{/* Password */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    Password
  </label>
  <input
    type="password"
    required
    value={data.password}
    placeholder="Enter password"
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
    onChange={(e) =>
      setData({ ...data, password: e.target.value })
    }
  />
</div>

{/* ONLY FOR SIGNUP */}
{!isLogin && (
  <>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        required
        value={data.confirmPassword}
        placeholder="Confirm password"
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        onChange={(e) =>
          setData({
            ...data,
            confirmPassword: e.target.value,
          })
        }
      />
    </div>
  </>
)}

          {/* Button */}
          <button
            type="submit"  // 🔥 IMPORTANT
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

        </form>
        {/* ✅ FORM END */}

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;