const Navbar = ({ email }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <div>
        <h1 className="font-bold text-lg">Task Manager</h1>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;