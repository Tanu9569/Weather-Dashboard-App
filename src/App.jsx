// src/App.jsx
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WeatherCard } from "./components/WeatherCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Header />
      <main className="flex-grow">
        <WeatherCard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
