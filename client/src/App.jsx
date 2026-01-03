import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Scan from "./pages/Scan"
import Analysis from "./pages/Analysis"
import Map from "./pages/Map"
import Dashboard from "./pages/Dashboard"
import Leaderboard from "./pages/Leaderboard"

const App = () => {
  const [activeScreen, setActiveScreen] = useState("home");

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  }

  const handleScan = () => {
    setTimeout(() => {
      setActiveScreen("analysis");
    }, 500);
  }

  const handleFindCenters = () => {
    setActiveScreen("map");
  }

  const handleBack = () => {
    setActiveScreen("home");
  }

  return (
    <div className="size-full">
      <div className="w-full h-full overflow-auto">
        {activeScreen === "home" && <Home onNavigate={handleNavigate} />}
        {activeScreen === "camera" && <Scan onScan={handleScan} />}
        {activeScreen === "analysis" && (
          <Analysis onFindCenters={handleFindCenters} onBack={handleBack} />
        )}
        {activeScreen === "map" && <Map onBack={handleBack} />}
        {activeScreen === "dashboard" && <Dashboard onBack={handleBack} />}
        {activeScreen === "leaderboard" && <Leaderboard onBack={handleBack} />}
      </div>
      {activeScreen !== "camera" && activeScreen !== "analysis" && (
        <Navbar activeScreen={activeScreen} onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default App
