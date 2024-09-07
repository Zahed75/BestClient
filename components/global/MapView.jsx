"use client";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapView({ coordinates }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    }
  }, []);

  // Component to smoothly fly to the new coordinates
  const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 13, {
        animate: true,
        duration: 1.5,
      });
    }, [center, map]);

    return null;
  };

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={coordinates}></Marker>
      <ChangeView center={coordinates} />
    </MapContainer>
  );
}
