import React, { useState, useEffect } from "react";
import axios from "axios";
import GlobeComponents from "./components/Globe";
import { NavbarComponent } from "./common/navbar.component";
import countries from "../src/models/countries.geojson";
import waterData from "./models/water.geojson";
import Oceans from "./models/ocean.geojson";

const App = () => {
  const [features, setFeatures] = useState([]);
  const [oceans, setOceans] = useState([]);
  const [water, setWater] = useState([]);
  const [loading, setLoading] = useState(true); // Устанавливаем loading в true в начале
  const [hover, setHover] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oceansResponse, waterResponse, countriesResponse] =
          await Promise.all([
            axios.get(Oceans),
            axios.get(waterData),
            axios.get(countries),
          ]);

        // Устанавливаем полученные данные в состояния
        setOceans(oceansResponse.data.features);
        setWater(waterResponse.data);
        setFeatures(countriesResponse.data.features);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="">
        <div className="pt-[80px]">
          {loading ? (
            <div className="flex justify-center items-center w-full h-[500px] ">
              <h1 className="font-bold text-lg text-white">Loading...</h1>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center w-full h-[500px]">
              <h1 className="font-bold text-lg text-red-500">
                {error.message}
              </h1>
            </div>
          ) : (
            <>
              <GlobeComponents
                countries={features}
                oceans={oceans}
                hover={hover}
                water={water}
                setHover={setHover}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
