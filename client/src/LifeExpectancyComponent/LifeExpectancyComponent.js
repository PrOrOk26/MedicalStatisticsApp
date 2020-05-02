import React from "react";
import { Spinner } from "../shared/components/Spinner/Spinner.js";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import "bootstrap/dist/css/bootstrap.min.css";

export function LifeExpectancyComponent() {
  const [lifeExpectancyData, setLifeExpectancyData] = useState([]);
  const {
    search,
  } = useLocation();

  const fetchAidsData = useCallback(async (url) => {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    const jsonData = await response.json().catch(function (error) {
      console.error("Request failed", error);
    });

    return jsonData;
  }, []);

  useEffect(() => {
    let url = "http://localhost:2699/data/life_expectancy";

    if(search) {
      url += search;
    }

    fetchAidsData(url).then((data) =>
      setLifeExpectancyData(data)
    );
  }, []);

  return (
    <main>
      <h1 className="mortality-h">Life expectancy at birth (years)</h1>
      <h2>Regions</h2>
      <div className="table-container">
        {lifeExpectancyData.length ? (
          <Table responsive striped bordered hover className="m-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Year</th>
                <th>Sex</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {lifeExpectancyData.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry["dim"]["REGION"]}</td>
                    <td>{entry["dim"]["YEAR"]}</td>
                    <td>{entry["dim"]["SEX"]}</td>
                    <td>{entry["Value"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
}
