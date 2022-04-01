import { CustComposedTextField } from "./CustComposedTextField";
import { CustTextField } from "./CustTextField";
import cssStyles from "./AddStatsOrLevelsModal.module.css";

export const Row = ({ name, id, score, handleDelete }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField name={name} id={id} />
      <CustComposedTextField value={score} id={id} />
      <div className={cssStyles.crossBox} onClick={() => handleDelete(id)}>
        <span>X</span>
      </div>
    </div>
  );
};
