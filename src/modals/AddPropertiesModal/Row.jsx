import { CustTextField } from "../AddStatsOrLevelsModal/CustTextField";
import cssStyles from "./AddPropertiesModal.module.css";

export const Row = ({ name, id, value, handleDelete }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField name={name} id={id} label="Name" />
      <CustTextField name={value} id={id} label="Value" />
      <div className={cssStyles.crossBox} onClick={() => handleDelete(id)}>
        <span>X</span>
      </div>
    </div>
  );
};