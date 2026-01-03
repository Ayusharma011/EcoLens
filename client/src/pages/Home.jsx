import { Camera, MapPin, Award, TrendingUp, Recycle } from "lucide-react";
import { motion } from "framer-motion";

const Home = ({ onNavigate }) => {
  const quickActions = [
    {
      id: "camera",
      icon: Camera,
      label: "Scan Waste",
      color: "from-green-500 to-emerald-600",
      description: "Identify & dispose",
    },
    {
      id: "map",
      icon: MapPin,
      label: "Find Centers",
      color: "from-blue-500 to-cyan-600",
      description: "Nearby recycling",
    },
    {
      id: "dashboard",
      icon: Award,
      label: "My Points",
      color: "from-purple-500 to-pink-600",
      description: "420 Green Points",
    },
    {
      id: "leaderboard",
      icon: TrendingUp,
      label: "Leaderboard",
      color: "from-orange-500 to-red-600",
      description: "See rankings",
    },
  ];

  return (
    <div>
      <div className="relative overflow-y-hidden overflow-x-hidden bg-linear-to-br from-green-200 via-blue-800 to-emerald-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            className="flex flex-col items-center justify-center"
          >
            <h1>
              <span className="text-6xl text-sky-50 font-bold">EcoLens</span>
            </h1>
            <div className="mt-2 text-xl text-center font-semibold text-gray-100">
              Let's Make The Planet
              <span className="text-green-500 px-2"> Greener </span>
              Together
            </div>
            <div className="mt-2 text-center font-semibold text-gray-800">
              Scan products to learn what they're made of and how to recycle them.
            </div>

            <div className="pt-8 flex justify-center items-center gap-6">
              <button className="px-6 h-20 py-2 rounded-3xl font-medium bg-linear-to-br from-blue-950 to-blue-500 border-2 border-gray-300 hover:scale-110 transition:transform duration-500 cursor-pointer ">
                Scan Here
              </button>
              <button className="px-4 h-20 py-2 rounded-3xl font-medium bg-linear-to-br from-blue-950 to-blue-500 border-2 border-gray-300 hover:scale-110 transition:transform duration-500 cursor-pointer">
                Explore Eco Tips
              </button>
            </div>
          </motion.div>

          <div className="mt-12">
            <h2 className="p-4 text-3xl text-gray-900 font-semibold">
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-sm:flex max-sm:flex-col">
              {quickActions.map((action, index) => {
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div
                      onClick={() => onNavigate(action.id)}
                      className="mx-auto min-w-20 max-sm:w-full hover:scale-105 hover:shadow-2xl shadow-teal-950 transition:transform duration-500"
                    >
                      <div className="flex flex-col justify-center bg-white rounded-2xl p-4">
                        <div
                          className={`w-10 h-10 flex justify-center items-center rounded-xl bg-linear-to-br ${action.color}`}
                        >
                          <action.icon className="w-7 h-7 text-white text-center" />
                        </div>
                        <div className="text-black mt-4">{action.label}</div>
                        <div className="text-xs text-gray-800">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-20 px-10">
          <h2 className="text-3xl text-gray-900 font-semibold pb-4">
            Eco Tips
          </h2>
          <div className="flex gap-3 p-3 backdrop-blur-3xl rounded-4xl">
            <div className="bg-linear-to-br from-blue-400 to-sky-400 flex justify-center items-center w-10 h-10 rounded-full">
              <Recycle className="w-7 h-7 text-gray-100"/>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-sm pb-1">Did you know?</h3>
              <p className="text-xs font-light">Recycling one plastic bottle saves enough energy to power a 60-watt light bulb for 3 hours!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
