import { CustComposedTextField } from "./CustComposedTextField";
import { CustTextField } from "./CustTextField";
import cssStyles from "./AddStatsModal.module.css";

export const Row = ({ name, id, score }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField name={name} id={id} />
      <CustComposedTextField value={score} id={id} />
      <div className={cssStyles.crossBox}>
        <span>X</span>
      </div>
    </div>
  );
};
