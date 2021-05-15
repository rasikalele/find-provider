import styles from "./ProviderList.module.css";
import csc from "country-state-city";
import { Formik, Form, Field } from "formik";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import TextInput from "./TextInput";

export default function ProviderList() {
  return (
    <>
      <h2>Search your Next Povider</h2>

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
              <button className={styles.searchBar} type="submit">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ul className={styles.providerUl}>
        <li>
          <a href="#">Dummy provider</a>
        </li>
        <li>
          <a href="#">Dummy provider</a>
        </li>

        <li>
          <a href="#">Dummy provider</a>
        </li>
        <li>
          <a href="#">Dummy provider</a>
        </li>

        <li>
          <a href="#">Dummy provider</a>
        </li>
        <li>
          <a href="#">Dummy provider</a>
        </li>
        <li>
          <a href="#">Dummy provider</a>
        </li>
      </ul>
    </>
  );
}
