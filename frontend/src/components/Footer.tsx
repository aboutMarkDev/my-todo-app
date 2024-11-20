export default function Footer() {
  return (
    <footer className="border-t border-secondary flex-icenter flex-col py-5 px-10 max-md:px-5 max-md:py-3 text-sm text-secondary">
      <h3>Copyright &copy; {new Date().getFullYear()} @devmark</h3>
      <h5>Enjoy!</h5>
    </footer>
  );
}
