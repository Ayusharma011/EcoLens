import { ArrowLeft, MapPin, Leaf, Droplet, Battery, Trash } from "lucide-react";
import { useState } from "react";
const Map = ({ onBack }) => {
  const filterOptions = [
    { label: "All", icon: Leaf },
    { label: "Plastic", icon: Droplet },
    { label: "E-Waste", icon: Battery },
    { label: "Glass", icon: Trash },
    { label: "Metal", icon: Trash },
  ];

  const [filter, setFilter] = useState("All");

  return (
    <div className="p-4">
      <div onClick={onBack} className="flex items-center gap-1">
        <ArrowLeft className="w-4 h-4 font-light text-black " />
        <div className="text-sm text-black hover:text-gray-600">Back</div>
      </div>
      <div className="flex items-center gap-1 pt-4">
        <MapPin className="w-6 h-6 text-green-500" />
        <div className="text-lg">Nearby Recycling Centers</div>
      </div>
      <div className="flex gap-3 items-center pt-3 max-sm:flex-col">
        {
          filterOptions.map((option, index) => {
            return(
              <button key={index} className={`cursor-pointer text-xs max-sm:w-24 px-2 h-6 border outline:none rounded-2xl flex items-center justify-center gap-1 text-gray-800 ${(filter !== option.label) ? "border-green-500" : "border-gray-400 bg-green-500"} `}>
                <option.icon className="w-3 h-3 text-gray-700"/>
                {option.label}
              </button>
            )
          })
        }
      </div>

    </div>
  );
};

export default Map;
