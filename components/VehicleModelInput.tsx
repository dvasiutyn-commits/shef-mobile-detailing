
"use client";

import { useState } from "react";

const models: Record<string, string[]> = {
  Toyota: [
    "Camry", "Corolla", "RAV4", "Highlander",
    "Grand Highlander", "4Runner", "Tacoma",
    "Tundra", "Prius", "Sienna", "Sequoia",
    "Crown", "Land Cruiser", "Supra"
  ],
  Honda: [
    "Civic", "Accord", "CR-V", "HR-V",
    "Pilot", "Passport", "Odyssey", "Ridgeline"
  ],
  Ford: [
    "F-150", "F-250", "F-350", "Escape",
    "Explorer", "Expedition", "Edge",
    "Bronco", "Bronco Sport", "Mustang",
    "Maverick", "Ranger", "Transit"
  ],
  Chevrolet: [
    "Silverado", "Equinox", "Traverse",
    "Tahoe", "Suburban", "Malibu", "Trax",
    "Blazer", "Colorado", "Camaro", "Corvette"
  ],
  BMW: [
    "2 Series", "3 Series", "4 Series",
    "5 Series", "7 Series", "X1", "X2",
    "X3", "X4", "X5", "X6", "X7", "i4", "iX"
  ],
  "Mercedes-Benz": [
    "C-Class", "E-Class", "S-Class",
    "CLA", "GLA", "GLB", "GLC", "GLE",
    "GLS", "G-Class", "Sprinter"
  ],
  Audi: [
    "A3", "A4", "A5", "A6", "A7", "A8",
    "Q3", "Q4 e-tron", "Q5", "Q7", "Q8",
    "e-tron", "TT", "R8"
  ],
  Lexus: [
    "IS", "ES", "LS", "UX", "NX",
    "RX", "GX", "LX", "TX", "RC"
  ],
  Nissan: [
    "Altima", "Sentra", "Versa", "Maxima",
    "Rogue", "Murano", "Pathfinder",
    "Armada", "Frontier", "Titan", "Kicks"
  ],
  Hyundai: [
    "Elantra", "Sonata", "Accent",
    "Tucson", "Santa Fe", "Palisade",
    "Kona", "Venue", "Ioniq 5", "Ioniq 6"
  ],
  Kia: [
    "Forte", "K5", "Soul", "Seltos",
    "Sportage", "Sorento", "Telluride",
    "Carnival", "EV6", "EV9"
  ],
  Jeep: [
    "Wrangler", "Grand Cherokee", "Cherokee",
    "Compass", "Renegade", "Gladiator",
    "Wagoneer", "Grand Wagoneer"
  ],
  Tesla: [
    "Model 3", "Model Y", "Model S",
    "Model X", "Cybertruck"
  ],
  Subaru: [
    "Impreza", "Legacy", "Outback",
    "Forester", "Crosstrek", "Ascent", "WRX", "BRZ"
  ],
  Mazda: [
    "Mazda3", "Mazda6", "CX-3", "CX-30",
    "CX-5", "CX-50", "CX-70", "CX-90", "MX-5 Miata"
  ],
  Volkswagen: [
    "Jetta", "Passat", "Golf", "GTI",
    "Tiguan", "Atlas", "Taos", "ID.4"
  ],
  GMC: [
    "Sierra", "Canyon", "Terrain",
    "Acadia", "Yukon", "Savana"
  ],
  Ram: ["1500", "2500", "3500", "ProMaster"],
  Dodge: ["Charger", "Challenger", "Durango", "Hornet"],
  Acura: ["Integra", "TLX", "RDX", "MDX"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90", "EX30"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Buick: ["Encore", "Encore GX", "Envision", "Enclave"],
  Cadillac: ["CT4", "CT5", "XT4", "XT5", "XT6", "Escalade"],
  Lincoln: ["Corsair", "Nautilus", "Aviator", "Navigator"],
  Infiniti: ["Q50", "QX50", "QX55", "QX60", "QX80"],
  Mitsubishi: ["Outlander", "Outlander Sport", "Eclipse Cross"],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Genesis: ["G70", "G80", "G90", "GV70", "GV80"],
  "Land Rover": [
    "Defender", "Discovery", "Discovery Sport",
    "Range Rover", "Range Rover Sport", "Range Rover Evoque"
  ],
  MINI: ["Cooper", "Countryman", "Clubman"],
  Rivian: ["R1T", "R1S"],
};

type Props = {
  make: string;
  value: string;
  onChange: (value: string) => void;
  className: string;
};

export default function VehicleModelInput({
  make,
  value,
  onChange,
  className,
}: Props) {
  const [focused, setFocused] = useState(false);

  const suggestions = (models[make] || [])
    .filter((model) =>
      model.toLowerCase().includes(value.toLowerCase().trim())
    )
    .slice(0, 6);

  return (
    <div className="relative">
      <input
        id="model"
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setTimeout(() => setFocused(false), 150);
        }}
        placeholder={
          make
            ? "Start typing your model"
            : "Select a make first"
        }
        disabled={!make}
        className={className}
      />

      {focused && make && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-950 shadow-xl">
          {suggestions.map((model) => (
            <button
              key={model}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(model);
                setFocused(false);
              }}
              className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800"
            >
              {model}
            </button>
          ))}
        </div>
      )}

      {make && value.trim() && suggestions.length === 0 && focused && (
        <p className="mt-2 text-xs text-zinc-400">
          Model not listed? You can enter it manually.
        </p>
      )}
    </div>
  );
}
