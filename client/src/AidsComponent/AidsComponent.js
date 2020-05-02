import React from "react";
import { Spinner } from "../shared/components/Spinner/Spinner.js";
import { useState, useEffect, useMemo, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { Doughnut } from "react-chartjs-2/dist/react-chartjs-2.js";

import "bootstrap/dist/css/bootstrap.min.css";

export function AidsComponent() {
  const [countriesData, setCountriesData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);

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

  const doughtnutData = useMemo(() => {
    return {
      datasets: [
        {
          data: regionsData.map((p) => p["Value"]),
          backgroundColor: [
            "MediumAquaMarine",
            "PapayaWhip",
            "Khaki",
            "Sienna",
            "LightCyan",
            "Maroon",
            "LightCoral",
          ],
          hoverBackgroundColor: [
            'rgb(145, 212, 190)',
            'rgb(245, 240, 233)',
            'rgb(250, 248, 228)',
            'rgb(165, 131, 115)',
            'rgb(169, 241, 241)',
            'rgb(143, 61, 61)',
            'rgb(238, 196, 196)',
          ]
        },
      ],
      labels: regionsData.map((p) => p["dim"]["REGION"]),
    };
  }, [regionsData]);

  useEffect(() => {
    fetchAidsData("http://localhost:2699/data/aids").then((data) =>
      setCountriesData(data)
    );
    fetchAidsData("http://localhost:2699/data/aids/?by=region").then((data) =>
      setRegionsData(data)
    );
  }, []);

  return (
    <main>
      <h1>Estimated number of people (all ages) living with HIV</h1>
      <h2>Plots</h2>
      <div className="plot">
        {regionsData.length ? <Doughnut data={doughtnutData} /> : <Spinner />}
      </div>
      <h2>Countries</h2>
      <div className="table-container">
        {countriesData.length ? (
          <Table responsive striped bordered hover className="m-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Year</th>
                <th>Value</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              {countriesData.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry["dim"]["COUNTRY"]}</td>
                    <td>{entry["dim"]["REGION"]}</td>
                    <td>{entry["dim"]["YEAR"]}</td>
                    <td>{entry["Value"]}</td>
                    <td>{entry["Range"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Spinner />
        )}
      </div>
      <h2>Regions</h2>
      <div className="table-container" style={{ height: "auto" }}>
        {regionsData.length ? (
          <Table responsive striped bordered hover className="m-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Year</th>
                <th>Value</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              {regionsData.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry["dim"]["REGION"]}</td>
                    <td>{entry["dim"]["YEAR"]}</td>
                    <td>{entry["Value"]}</td>
                    <td>{entry["Range"]}</td>
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
