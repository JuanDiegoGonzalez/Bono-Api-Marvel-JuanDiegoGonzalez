import React, { useState, useEffect } from "react";
import "./Personaje.css";
const CryptoJS = require("crypto-js");

export const Personaje = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("personajes") === null) {
        setPersonajes("Loading...");
      } else {
        setPersonajes(JSON.parse(localStorage.getItem("personajes")));
      }
    } else {
      const ts = new Date();
      const publicKey = "64eafb50399aeb6c8ea4307c15aad826";
      const privateKey = "96d10ad94cecabb487e404991cd7e794ca91d2e3";

      const hash = CryptoJS.MD5(ts + privateKey + publicKey);
      const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
          setPersonajes(data.data.results);
          localStorage.setItem("personajes", JSON.stringify(data.data.results));
        });
    }
  }, []);

  return (
    <>
      <h1>Personajes</h1>
      <div className="container">
        {personajes.map((act) => (
          <div className="card" key={act.id}>
            <h3>{act.name}</h3>
            <h5>ID: {act.id}</h5>
            <p>
              {act.description !== "" ? act.description : "No description."}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
