import { CustSelect } from "./CustSelect";
import { CustTextField } from "./CustTextField";
import cssStyles from "./AddStatsModal.module.css";

export const Row = ({ name, id, score }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField name={name} key={id} id={id} />
      <CustSelect value={score} key={id} id={id} />
      <div className={cssStyles.crossBox}>
        <span>X</span>
      </div>
    </div>
  );
};
