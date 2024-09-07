"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { FaSearch } from "react-icons/fa"; // For the search icon

const MapView = dynamic(() => import("@/components/global/MapView"), {
  ssr: false,
});

const stores = [
  {
    id: 1,
    name: "Mymensingh Showroom",
    address: "82/A, CK Ghosh Road, Mymensing",
    district: "Mymensingh",
    openDay: "Saturday - Thursday",
    hours: "9.30 AM - 9.00 PM",
    coordinates: [24.7471, 90.4203],
  },
  {
    id: 2,
    name: "Dhaka Showroom",
    address: "123, Dhanmondi, Dhaka",
    district: "Dhaka",
    openDay: "Saturday - Thursday",
    hours: "9.30 AM - 9.00 PM",
    coordinates: [23.8103, 90.4125],
  },
  {
    id: 3,
    name: "Chittagong Showroom",
    address: "45/A, Agrabad, Chittagong",
    district: "Chittagong",
    openDay: "Saturday - Thursday",
    hours: "9.30 AM - 9.00 PM",
    coordinates: [22.3569, 91.7832],
  },
];

const districts = [...new Set(stores.map((store) => store.district))];

export default function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterStores(e.target.value, selectedDistrict);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    filterStores(searchTerm, district);
  };

  const filterStores = (searchTerm, district) => {
    const filtered = stores.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistrict = district === "" || store.district === district;
      return matchesSearch && matchesDistrict;
    });
    setFilteredStores(filtered);
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
      <div className="w-full p-4">
        <h2 className="text-xl font-bold mb-4">Find Store</h2>
        <div className="mb-4">
          <p className="text-sm">
            See the list of all our stores below, or enter a name or area to
            search for one.
          </p>
        </div>

        <div className="flex justify-between items-center gap-3 w-full my-10">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by store or district"
              className="w-full p-2 border rounded-md border-primary focus:outline-none focus:border-primary"
            />
            <div className="bg-primary absolute top-0 right-0 w-11 h-full rounded-md">
              <FaSearch className="flex justify-center items-center mx-auto mt-3 text-lg text-white" />
            </div>
          </div>

          <div className="w-1/4">
            <select
              className="w-full p-2 rounded-md border-0 focus:outline-none focus:border-0 "
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">All Districts</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`border p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md flex justify-between items-center 
                ${selectedStore.id === store.id ? "bg-gray-100" : ""}`} // Apply bg-gray-100 if active
              onClick={() => handleStoreClick(store)}
            >
              <div>
                <h3 className="text-lg font-bold">{store.name}</h3>
                <p className="text-sm text-slate-400">{store.address}</p>
              </div>
              <div>
                <p>{store.openDay}</p>
                <p className="text-sm text-slate-400">{store.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full p-4">
        <MapView coordinates={selectedStore.coordinates} />
      </div>
    </div>
  );
}
