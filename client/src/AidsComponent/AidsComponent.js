import React from "react";
import { useState, useEffect } from "react";

export function AidsComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:2699/data/aids", {
        method: "GET",
        mode: "cors",
      });

      const jsonData = await response.json().catch(function(error) {
        console.error('Request failed', error)
      });

      setData(jsonData)
    })();
  }, []);

  return (
    <>
      <p>{data.length ? JSON.stringify(data) : "No data"}</p>
    </>
  );
}
