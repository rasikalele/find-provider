import React, { useState, useEffect } from "react";
import styles from "./ProviderList.module.css";
import { Formik, Form } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import TextInput from "./TextInput";
import axios from "axios";
import { Link } from "react-router-dom";

// Check TODOs for next iteration
// TODO: font size
// TODO: list is all uppercase change it
// TODO: better folder structure
// TODO: configure ESlinter
export default function ProviderList() {
  const [searchByName, setsearchByName] = useState("");
  const [searchByOrg, setsearchByOrg] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState({
    status: false,
    label: "show advance search",
  });
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoader] = useState(true);

  const handleChange = (e) => {
    setsearchByName(e.target.value);
  };
  const handleChange1 = (e) => {
    setsearchByOrg(e.target.value);
  };
  const clearInput = (e) => {
    setsearchByOrg("");
  };
  useEffect(() => {
    let query = { version: "2.0" };

    if (advancedSearch.status) {
      query = formData;
    } else {
      searchByName.length > 1
        ? (query["first_name"] = searchByName)
        : (query["organization_name"] = searchByOrg);
    }

    axios
      .get("/api", { params: query })
      .then((response) => {
        if (response.data.results) {
          // probablly need setTimeout ?
          setLoader(false);

          setSearchResults(response.data.results);
        } else {
          setSearchResults([]);
          setLoader(false);
          setError(response.data.Errors[0].description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [, searchByName, searchByOrg, formData]);

  const searchProvider = (values) => {
    values["version"] = "2.0";
    setFormData(values);
  };
  const toggleButton = () => {
    if (advancedSearch.status) {
      setFormData([]);
      setSearchResults([]);
      setAdvancedSearch({ label: "show advance search", status: false });
    } else {
      setsearchByName("");
      setsearchByOrg("");
      setAdvancedSearch({ label: "Hide search", status: true });
    }
  };

  return (
    <>
      <h2 className={styles.headerColor}>Search either by name or organization name</h2>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchByName}
          className={styles.searchInput}
          onChange={(e) => {
            setsearchByOrg("");
            setAdvancedSearch({ status: false, label: "show advance search" });
            setFormData([]);
            setsearchByName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Search by Organization Name"
          value={searchByOrg}
          className={styles.searchInput}
          id="searchByOrg"
          onChange={(e) => {
            setsearchByName("");
            setAdvancedSearch({ status: false, label: "show advance search" });
            setFormData([]);
            setsearchByOrg(e.target.value);
          }}
        />
      </div>

      <p>
        {" "}
        <button className={styles.searchFilterButton} onClick={toggleButton}>
          {advancedSearch.label}
        </button>{" "}
      </p>
      {advancedSearch.status ? (
        //TODO: add yup validation
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            organization_name: "",
            country: "US",
            state: "",
            city: "",
            postal_code: "",
          }}
          onSubmit={searchProvider}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className={styles.row}>
                <TextInput
                  label="First Name"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                />
                <TextInput
                  label="Last Name"
                  type="text"
                  name="last_name"
                  placeholder="First Name"
                />
                <TextInput
                  label="Org Name"
                  type="text"
                  name="organization_name"
                  placeholder="First Name"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.col15}>
                  <label>Country</label>{" "}
                </div>

                <div className={styles.col35}>
                  <CountryDropdown
                    name="country"
                    value={values.country}
                    labelType="short"
                    valueType="short"
                    priorityOptions={["US"]}
                    onChange={(_, e) => handleChange(e)}
                    onBlur={handleBlur}
                  />
                </div>

                <div className={styles.col15}>
                  {" "}
                  <label>State</label>
                </div>
                <div className={styles.col35}>
                  <RegionDropdown
                    name="state"
                    country={values.country}
                    value={values.state}
                    countryValueType="short"
                    labelType="short"
                    valueType="short"
                    onChange={(_, e) => handleChange(e)}
                    onBlur={handleBlur}
                  />
                </div>

                <TextInput
                  label="City"
                  type="text"
                  name="city"
                  placeholder="City"
                />
                <TextInput
                  label="postal Code"
                  type="text"
                  name="postal_code"
                  placeholder="Postal code"
                />
              </div>

              <div className={styles.row}>
                <button
                  type="submit"
                  className={styles.searchBar}
                  type="submit"
                >
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div></div>
      )}

      <ul className={styles.providerUl}>
        {isLoading ? (
          <div>Loading</div>
        ) : searchResults == undefined || searchResults.length == 0 ? (
          error ? (
            <li>{error}</li>
          ) : (
            <li className={styles.noData}>No providers found</li>
          )
        ) : (
          searchResults.map((item) => (
            <li key={item.number}>
              <Link
                to={{
                  pathname: "/details/" + item.number,
                  state: { fromDashboard: item },
                }}
              >
                {item.basic.name_prefix} {item.basic.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
