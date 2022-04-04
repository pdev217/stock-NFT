//next
import Image from "next/image";
//components
import { CustTextField } from "./CustTextField";
//styles
import cssStyles from "./AddToNFTModal.module.css";

export const PropertiesRow = ({ name, id, value, handleDelete, modalData, setModalData, index }) => {
  return (
    <div className={cssStyles.row}>
      <CustTextField
        name={name}
        id={id}
        index={index}
        label="Name"
        modalData={modalData}
        setModalData={setModalData}
      />
      <CustTextField
        name={value}
        id={id}
        index={index}
        label="Value"
        modalData={modalData}
        setModalData={setModalData}
      />
      <div className={cssStyles.crossBox} onClick={() => handleDelete(id)}>
        <Image
          src="/create-nft/Icon-Close.svg"
          alt="close-icon"
          width={15}
          height={15}
        />
      </div>
    </div>
  );
};
