import { CustTextField } from "./CustTextField";
import cssStyles from "./AddToNFTModal.module.css";

export const PropertiesRow = ({ name, id, value, handleDelete }) => {
  

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