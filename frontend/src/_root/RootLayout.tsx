import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <main className="h-screen w-full max-w-screen-2xl mx-auto py-10 max-md:py-5">
      <section className="h-full w-full flex-jbetween flex-col">
        <Header />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}
