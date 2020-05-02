import React from "react";
import { Spinner } from "../shared/components/Spinner/Spinner.js";
import { useState, useEffect, useMemo, useCallback } from "react";
import Table from "react-bootstrap/Table";

import "bootstrap/dist/css/bootstrap.min.css";

export function ChildMortalityComponent() {
  const [mortalityRegionsData, setMortalityRegionsData] = useState([]);
  const [mortalityCountriesData, setMortalityCountriesData] = useState([]);

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
    fetchAidsData(
      "http://localhost:2699/data/mortality/children/?by=region"
    ).then((data) => setMortalityRegionsData(data));
    fetchAidsData(
      "http://localhost:2699/data/mortality/children"
    ).then((data) => setMortalityCountriesData(data));
  }, []);

  return (
    <main>
      <div className="m-tooltip">
        <h1 className="mortality-h">Children mortality rate</h1>
        <span className="tooltiptext">
          Number of under-five deaths (thousands)
        </span>
      </div>
      <h2>Regions</h2>
      <div className="table-container">
        {mortalityRegionsData.length ? (
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
              {mortalityRegionsData.map((entry, index) => {
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
      <h2>Countries</h2>
      <div className="table-container">
        {mortalityCountriesData.length ? (
          <Table responsive striped bordered hover className="m-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Year</th>
                <th>Sex</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {mortalityCountriesData.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry["dim"]["COUNTRY"]}</td>
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
