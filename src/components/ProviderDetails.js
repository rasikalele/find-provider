import { useLocation } from "react-router-dom";
import styles from "./ProviderDetails.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import React, { useState, useEffect, useParams } from "react";

const Details = () => {
  let url = window.location.href;
  const [providerDetails, setProviderDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api", { params: { version: "2.0", number: url.split("/")[4] } })
      .then((response) => {
        setProviderDetails(response.data.results[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setProviderDetails([]);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Patience is key to success.. Wait & we would load your information</div>
      ) : (
        <div>{displayData(providerDetails)}</div>
      )}
    </>
  );
};

const displayData = (provider) => {
  return (
    <>
      <h1>{provider.basic.name_prefix} {provider.basic.name}</h1>

      <p className="title">NPI: {provider.number}</p>
      <p>Locations</p>
      <div>
        {provider.addresses.map((address, index) => {
          return (
            <address key={index}>
              <span>
                <p>Address Type: {address.address_purpose}</p>
                <span>
                  {address.address_1} {address.address_2},
                </span>
                <span> {address.city}</span>,<abbr>{address.state}</abbr>
                &nbsp;&nbsp;
                <span> {address.postal_code}</span>
                <span> {address.country_name}</span>
              </span>
              <div>
                contact at:{" "}
                <a href={"tel:+" + address.telephone_number}>
                  {address.telephone_number}
                </a>
              </div>
            </address>
          );
        })}
      </div>
    </>
  );
};
const Courses = () => {
  let location = useLocation();
  const provider = location.state?.fromDashboard;
  return (
    <>
      {provider ? (
        <>
          <h2>Provider Details</h2>

          <div className={styles.card}>
            {displayData(provider)}
            <p>
              <CopyToClipboard text={window.location.href}>
                <button>Share Provider Info</button>
              </CopyToClipboard>
            </p>
          </div>
        </>
      ) : (
        <Details />
      )}
    </>
  );
};

export default Courses;
