export default function () {
  return (
    <div className="flex flex-row">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r-lg flex flex-row items-center px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => {
          fetch(`${import.meta.env.VITE_API_BASE}/createMessage`, {
            method: "POST",
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(console.error);
        }}
      >
        Make Post Request
      </button>
    </div>
  );
}
