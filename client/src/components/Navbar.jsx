import { House, Camera, Map, User, Trophy } from 'lucide-react'

const Navbar = ({ activeScreen, onNavigate }) => {
  const navItems = [
    {id: "home", icon: House, label: "Home"},
    {id: "camera", icon: Camera, label: "Scan"},
    {id: "map", icon: Map, label: "Map"},
    {id: "dashboard", icon: User, label: "Profile"},
    {id: "leaderboard", icon: Trophy, label: "Rank"},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white h-16 z-10 border-t-2 border-t-gray-300">
      <div className='flex justify-center items-center gap-1 sm:gap-3 md:gap-5'>
      {
        navItems.map((item) => {
          const isActive = activeScreen === item.id
          return (
            <button onClick={() => onNavigate(item.id)} className='hover:scale-110 transition-transform relative flex flex-col items-center py-2 px-4'>
              <div className='relative'>
                <item.icon className={`w-6 h-6 ${isActive ?  "text-green-600" : "text-gray-400"}`}/>
              </div>
              <div className={`w-1 h-1 rounded-full bg-green-600 ${isActive ? "" : "invisible"}`}>
              </div>
              <span className={`text-xs ${isActive ? "text-green-600" : "text-gray-500"}`}>
                {item.label}
              </span>
            </button>
          )
        })
      }
      </div>
    </nav>
  )
}

export default Navbar
