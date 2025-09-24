"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Pre-defined map of regions to their coordinates
const regionCoordinates = {
  "Abu Dhabi": [24.4667, 54.3667],
  Doha: [25.29, 51.53],
  Sharjah: [25.33, 55.52],
  Riyadh: [24.71, 46.68],
  Manama: [26.2279, 50.5857],
  Muscat: [23.59, 58.38],
  "Kuwait City": [29.3697, 47.9783],
};

const HeatMap = ({ data, title, valueKey }) => {
  const validData = data.filter((item) => regionCoordinates[item.region]);

  if (validData.length === 0) {
    return <div>No valid data for heatmap</div>;
  }

  const maxValue = Math.max(
    ...validData.map((item) => Number(item[valueKey]) || 0)
  );

  const centerLat =
    validData.reduce(
      (sum, item) => sum + regionCoordinates[item.region][0],
      0
    ) / validData.length;
  const centerLng =
    validData.reduce(
      (sum, item) => sum + regionCoordinates[item.region][1],
      0
    ) / validData.length;

  const centerCoordinates = [centerLat, centerLng];

  return (
    <div style={{ marginBottom: "40px" }}>
      <div className="text-xl mb-5">{title}</div>

      <MapContainer
        className="w-full flex-1"
        style={{ height: "600px", width: "100%" }}
        zoom={5}
        center={centerCoordinates}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {validData.map((item) => {
          const coordinates = regionCoordinates[item.region];
          const value = Number(item[valueKey]) || 0;
          const radius = Math.max(5, (value / maxValue) * 30);

          return (
            <CircleMarker
              key={item.region}
              center={coordinates}
              radius={radius}
              color="#ff7800"
              fillOpacity={0.5}
            >
              <Popup>
                <strong>{item.region}</strong>
                <br />
                {title}: ${value.toLocaleString()}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default HeatMap;
