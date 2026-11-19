
import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon in Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DEFAULT_POSITION = [20.5937, 78.9629];

// Handles clicking on the map
function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

// Moves the map when a searched location is selected
function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15);
  }, [position, map]);

  return null;
}

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectPosition = (newPosition) => {
    setPosition(newPosition);

    onLocationSelect?.({
      lat: newPosition[0],
      lng: newPosition[1],
    });
  };

  // Search location using OpenStreetMap Nominatim
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError("Location not found. Try another search.");
        return;
      }

      const result = data[0];

      selectPosition([
        Number(result.lat),
        Number(result.lon),
      ]);
    } catch (err) {
      setError("Unable to search location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          placeholder="Search city, venue or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-sm text-[var(--text-color)] placeholder:text-[var(--muted-color)] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition"
        />

        <button
          type="submit"
          disabled={loading || !search.trim()}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Map */}
      <div className="relative z-0 w-full h-[280px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl border border-[var(--border-color)]">

        <MapContainer
          center={DEFAULT_POSITION}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onSelect={selectPosition} />

          {position && (
            <>
              <Marker position={position} icon={defaultIcon} />
              <MapController position={position} />
            </>
          )}
        </MapContainer>

      </div>

      {/* Selected Location Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">

        {position ? (
          <>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-color)] mb-1">
                SELECTED COORDINATES
              </p>

              <strong className="text-sm font-semibold text-[var(--text-color)]">
                {position[0].toFixed(5)}, {position[1].toFixed(5)}
              </strong>
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-medium text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Location Selected
            </span>
          </>
        ) : (
          <p className="text-sm text-[var(--muted-color)]">
            Search for a location or click on the map to select it.
          </p>
        )}

      </div>

    </div>
  );
};

export default LocationPicker;
