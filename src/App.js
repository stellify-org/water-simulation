import { useState } from "react";
import GlobeComponents from "./components/Globe";
import { NavbarComponent } from "./common/navbar.component";
import { useEffect } from "react";
import countries from "../src/models/countries.geojson";
import waterData from "./models/water.geojson";
import Oceans from "./models/ocean.geojson";

const App = () => {
  const [features, setFeatures] = useState([]);
  const [oceans, setOceans] = useState([]);
  const [water, setWater] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOceans = () => {
      setLoading(true);
      fetch(`${Oceans}`)
        .then((ocn) => {
          if (!ocn.ok) {
            throw new Error("Network response was not ok");
          }
          return ocn.json();
        })
        .then((rvrs) => {
          setOceans(rvrs.features);
        })
        .catch((error) => {
          setError(error);
        });
    };

    fetchOceans();

    const fethcWater = () => {
      setLoading(true);
      fetch(`${waterData}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((wtr) => {
          setWater(wtr);
        })
        .catch((error) => {
          setError(error);
        });
    };
    fethcWater();

    const fetchFeatures = () => {
      setLoading(true);
      fetch(`${countries}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((fts) => {
          setFeatures(fts.features);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    };

    fetchFeatures();
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
