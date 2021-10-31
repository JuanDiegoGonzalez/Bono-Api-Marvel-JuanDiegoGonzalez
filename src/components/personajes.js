import React, { useState, useEffect } from "react";
const CryptoJS = require("crypto-js");

export const Personaje = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("personajes") === null) {
        setPersonajes("Loading...");
      } else {
        setPersonajes(localStorage.getItem("personajes"));
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
          localStorage.setItem("personajes", data.data.results);
        });
    }
  }, []);

  return (
    <>
      <h1>Personajes</h1>
      {personajes.map((act) => (
        <p key={act.id}>{act.name}</p>
      ))}
    </>
  );
};
