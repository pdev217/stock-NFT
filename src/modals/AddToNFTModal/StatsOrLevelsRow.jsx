//components
import { CustComposedTextField } from "./CustComposedTextField";
import { CustTextField } from "./CustTextField";
//styles
import cssStyles from "./AddToNFTModal.module.css";

export const StatsOrLevelsRow = ({ name, id, value, maxValue, handleDelete, modalData, setModalData, index }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField
        name={name}
        id={id}
        label="Name"
        modalData={modalData}
        setModalData={setModalData}
        index={index}
      />
      <CustComposedTextField
        value={value}
        id={id}
        modalData={modalData}
        setModalData={setModalData}
        index={index}
        maxValue={maxValue}
      />
      <div className={cssStyles.crossBox} onClick={() => handleDelete(id)}>
        <span>X</span>
      </div>
    </div>
  );
};
