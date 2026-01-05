import {
  ArrowLeft,
  MapPin,
  Leaf,
  Droplet,
  Battery,
  Trash,
  Navigation,
  Star,
  Clock,
  Phone,
} from "lucide-react";
import { useState } from "react";

const Map = ({ onBack }) => {
  const filterOptions = [
    { label: "All", icon: Leaf },
    { label: "Plastic", icon: Droplet },
    { label: "E-Waste", icon: Battery },
    { label: "Glass", icon: Trash },
    { label: "Metal", icon: Trash },
  ];

  const centers = [
    {
      name: "GreenCycle Center",
      distance: "0.8 km",
      address: "123 Main Street, Downtown",
      hours: "Open until 6:00 PM",
      rating: 4.8,
      reviews: 124,
      accepts: ["Plastic", "Paper", "Glass", "Metal"],
      phone: "+1 (555) 123-4567",
    },
    {
      name: "EcoHub Recycling",
      distance: "1.2 km",
      address: "456 Oak Avenue, Midtown",
      hours: "Open 24/7",
      rating: 4.6,
      reviews: 89,
      accepts: ["E-Waste", "Batteries", "Plastic", "Paper"],
      phone: "+1 (555) 234-5678",
    },
    {
      name: "City Waste Management",
      distance: "2.3 km",
      address: "789 Industrial Blvd",
      hours: "Closed • Opens 8:00 AM",
      rating: 4.5,
      reviews: 203,
      accepts: ["All Materials", "Hazardous Waste"],
      phone: "+1 (555) 345-6789",
    },
  ];

  const [filter, setFilter] = useState("All");

  const handleFilter = (label) => {
    setFilter(label);
  };

  return (
    <div className="p-4 bg-[#e8f5e9] min-h-screen">
      <div onClick={onBack} className="flex items-center gap-1">
        <ArrowLeft className="w-4 h-4 font-light text-black " />
        <div className="text-sm text-black hover:text-gray-600">Back</div>
      </div>
      <div className="flex items-center gap-1 pt-4">
        <MapPin className="w-6 h-6 text-green-500" />
        <div className="text-lg">Nearby Recycling Centers</div>
      </div>
      <div className="flex gap-3 items-center pt-3">
        {filterOptions.map((option, index) => {
          return (
            <button
              key={index}
              onClick={() => handleFilter(option.label)}
              className={`cursor-pointer text-xs px-1 h-6 border outline:none rounded-2xl flex items-center justify-center gap-1 text-gray-800 ${
                filter !== option.label
                  ? "border-green-500 hover:bg-gray-200"
                  : "border-gray-400 bg-green-500"
              } `}
            >
              <option.icon className="w-3 h-3 text-gray-700" />
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="h-[50vh] bg-gray-300 m-4 overflow-x-hidden"></div>

      <div className="overflow-y-hidden mb-16 md:grid md:grid-cols-2 md:gap-x-4">
        {centers.map((center, index) => {
          return (
            <div key={index} className="bg-white rounded-2xl shadow p-4 my-2 relative flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="absolute top-2 right-2 w-10 h-10 bg-green-500 rounded-full flex justify-center items-center hover:bg-green-400">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-black font-semibold text-lg">{center.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-green-500" />
                <p className="text-gray-500 text-sm">{center.distance}</p>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-500 fill-green-500" />
                <p className="text-gray-500 text-sm">
                  {center.rating} ({center.reviews})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-gray-500 text-sm">{center.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-green-400 text-sm">{center.hours}</p>
              </div>
              <p className="text-gray-500 text-xs">Accepts:</p>

              <div className="flex gap-3">
                <button className="px-4 py-1 flex justify-center items-center gap-2 bg-[#e8f5e9] rounded-2xl hover:bg-green-50">
                  <Phone className="w-5 h-5 text-black"/>
                  <p>Call</p>
                </button>
                <button className="px-4 py-1 bg-green-400 rounded-2xl hover:bg-green-300">
                  <p className="text-black">Get Directions</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;
