import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm border-b">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-5 text-center text-sm text-gray-500">
        <p className="tracking-wide leading-relaxed">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-indigo-600">
            My Vocabulary App
          </span>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
