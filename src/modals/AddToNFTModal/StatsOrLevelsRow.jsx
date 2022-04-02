import { CustComposedTextField } from "./CustComposedTextField";
import { CustTextField } from "./CustTextField";
import cssStyles from "./AddToNFTModal.module.css";

export const 
StatsOrLevelsRow = ({ name, id, score, handleDelete }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField name={name} id={id} label="Name" />
      <CustComposedTextField value={score} id={id} />
      <div className={cssStyles.crossBox} onClick={() => handleDelete(id)}>
        <span>X</span>
      </div>
    </div>
  );
};
