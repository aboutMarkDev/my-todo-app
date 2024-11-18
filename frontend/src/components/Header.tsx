export default function Header() {
  const isAuthenticated = true;
  return (
    <header className="border-b border-secondary h-[5rem] px-10 max-md:px-5 flex items-center justify-between">
      {isAuthenticated && <h3 className="font-light">Hi, Username!</h3>}
      <h1 className="text-xl font-semibold">(Teudo)ongi App</h1>
      {isAuthenticated && (
        <button
          className="rounded-lg px-3 py-1 bg-primary text-lg"
          type="button"
        >
          Logout
        </button>
      )}
    </header>
  );
}
