import React from "react";
import { useField } from "formik";
import styles from "./ProviderList.module.css";

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={`${styles.textInput}`}>
      <div className={styles.col15}>
        <label htmlFor={props.id || props.name}> {label}</label>
      </div>

      <div className={styles.col35}>
        <input id={props.id || props.name} {...field} {...props} />
      </div>
    </div>
  );
}
