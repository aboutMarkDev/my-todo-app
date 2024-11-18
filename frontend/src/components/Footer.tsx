export default function Footer() {
  return (
    <footer className="border-t border-secondary h-[5rem] flex-icenter flex-col px-10 max-md:px-5 text-sm text-secondary">
      <h3>Copyright &copy; {new Date().getFullYear()} @devmark</h3>
      <h5>Enjoy!</h5>
    </footer>
  );
}
