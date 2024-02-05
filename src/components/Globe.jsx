import * as d3 from "d3";
import Globe from "react-globe.gl";
import React, { useCallback, useMemo, useState } from "react";

const GlobeComponents = ({ countries, oceans, hover, setHover, water }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [wtr, setWtr] = useState([]);
  const allData = [...countries, ...oceans];
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
  const getVal = (feat) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(() => Math.max(...countries.map(getVal)), [countries]);
  colorScale.domain([0, maxVal]);

  const handlePolygonClick = useCallback(
    (polygon) => {
      if (polygon) {
        setSelectedCountry(polygon);
        const selectedWaterData = water.find(
          (item) => item.name === polygon.properties.NAME,
        );
        if (selectedWaterData) {
          setWtr(selectedWaterData);
        }
      } else {
        setSelectedCountry(null);
      }
    },
    [water],
  );

  return (
    <>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        polygonsData={allData}
        onPolygonClick={handlePolygonClick}
        onPolygonHover={setHover}
        polygonAltitude={(d) => (d === hover ? 0.12 : 0.06)}
        polygonCapColor={(d) =>
          d.isOcean
            ? "steelblue"
            : d === hover
            ? "steelblue"
            : colorScale(getVal(d))
        }
      />
      {selectedCountry && (
        <div className="bg-slate-900 backdrop-blur-sm bg-white/10 w-[350px] p-10 absolute top-[120px] left-[40px] rounded-[10px] shadow-md ">
          <div className="">
            {selectedCountry.properties?.NAME && (
              <h2 className="text-white">
                Country: {selectedCountry.properties?.NAME}
              </h2>
            )}
            {selectedCountry.properties?.POP_EST && (
              <p className="text-white">
                Population: {selectedCountry.properties?.POP_EST}
              </p>
            )}
            {selectedCountry.properties?.GDP_MD_EST && (
              <p className="text-white">
                GDP: {selectedCountry.properties?.GDP_MD_EST}
              </p>
            )}
            {wtr && (
              <div>
                <p className="text-white">
                  Fresh Water Quantity: {wtr.total} km<sup>3</sup>
                </p>
                <p className="text-white">Year: {wtr.year}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobeComponents;
