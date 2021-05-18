import React, { useState, useEffect, useParams, useLocation } from "react";
import styles from "./ProviderList.module.css";
import csc from "country-state-city";
import { Formik, Form, Field } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import TextInput from "./TextInput";
import axiosInstance from "./axios";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ProviderList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchTerm1, setSearchTerm1] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [advancedSearch, setAdvancedSearch] = React.useState({ "status": false, "label":"show advance search"});
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleChange1 = (e) => {
    setSearchTerm1(e.target.value);
  };
  const clearInput = (e) => {
  
   setSearchTerm1("");
  }
  React.useEffect(() => {
    console.log(searchTerm);
    console.log(searchTerm1)
    let query={'version':"2.0"}
  
   if(advancedSearch.status)
   {
      query=formData;
   }
   else{
    searchTerm.length> 1 ? query["first_name"]=searchTerm : query["organization_name"]=searchTerm1
   }
   
    
    console.log(formData)


    axios
      .get("/api", { params: query})
      .then((response) => {
        console.log(response.data.results);
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [,searchTerm,searchTerm1,formData]);

  const searchProvider = (values) => {
    values["version"]="2.0";
    setFormData(values);

  };
  const toggleButton = ()=>{
   // setAdvancedSearch({"status": !advancedSearch.status});
    console.log(advancedSearch)
    if(advancedSearch.status){
      setAdvancedSearch({"label": "show advance search", "status": false})
    }
    else{
      setSearchTerm("");
      setSearchTerm1("");
      setAdvancedSearch({"label": "Hide search", "status": true})
    }
  }

  return (
    <>
      <h2>Search your Next Povider</h2>
      <p>Search either by name or organization name</p>
      <div className={styles.row}>
   
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        className={styles.searchInput}
        onChange={(e) => {
          setSearchTerm1("");
          setAdvancedSearch({ "status": false, "label":"show advance search"})
          setFormData([])
          setSearchTerm(e.target.value)
        }}
      />
      <input
        type="text"
        placeholder="Search by Organization Name"
        value={searchTerm1}
        className={styles.searchInput}
        id="searchTerm1"
        onChange={(e) => {
          setSearchTerm("");
          setAdvancedSearch({ "status": false, "label":"show advance search"})
          setFormData([])
          setSearchTerm1(e.target.value)
        }}
      />
      </div>
{/*    
    <SearchFilters />   */}
   <p> <button onClick={toggleButton}>{advancedSearch.label}</button>  </p>
   {
     advancedSearch.status ?
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
           <button type="submit" className={styles.searchBar} type="submit">
             Search
           </button>
         </div>
       </Form>
     )}
   </Formik> :
   <div></div>
   }


      <ul className={styles.providerUl}>
        {searchResults == undefined || searchResults.length == 0 ? (
          <li className={styles.noData}>No providers found</li>
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
