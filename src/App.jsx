import './App.css'
import { Header } from './components/Header';
import { WeatherCard} from './components/WeatherCard';
import { fetchWeatherData } from './services/weatherApi';
function App() {
  return (
    <div>
      <Header />
      <WeatherCard/>
    </div>
  )
}

export default App
