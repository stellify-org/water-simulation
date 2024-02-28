import React, { useState, useEffect } from "react";
import GlobeComponents from "./components/Globe";
import { NavbarComponent } from "./common/navbar.component";
import countries from "../src/models/countries.geojson";
import waterData from "./models/water.geojson";
import Oceans from "./models/ocean.geojson";

const App = () => {
  const [features, setFeatures] = useState([]);
  const [oceans, setOceans] = useState([]);
  const [water, setWater] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oceansRes, countriesRes, waterRes] = await Promise.all([
          fetch(Oceans).then((response) => response.json()),
          fetch(countries).then((response) => response.json()),
          fetch(waterData).then((response) => response.json()),
        ]);

        setOceans(oceansRes.features);
        setFeatures(countriesRes.features);
        setWater(waterRes);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData().then();
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
