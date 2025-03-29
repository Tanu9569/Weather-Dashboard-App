// src/App.jsx
import './App.css';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';

function App() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <WeatherCard />
    </div>
  );
}

export default App;