import React from "react";
import { useState, useEffect } from "react";

export function AidsComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:2699/data/aids", {
        method: "GET",
      });

      response.json().then((res) => setData(res));
    })();
  }, []);

  return (
    <>
      <p>{data.length ? JSON.stringify(data) : "No data"}</p>
    </>
  );
}
