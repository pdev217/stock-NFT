import { useState } from "react";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { PropertiesRow } from "./PropertiesRow";
//styles
import { styles as jsStyles } from "./AddToNFTModal.utils";
import cssStyles from "./AddToNFTModal.module.css";
//utils
import { emptyProperty } from "./AddToNFTModal.utils";

export const AddPropertiesModal = ({ isModalOpened, setIsModalOpened, data, setData }) => {
  const [modalData, setModalData] = useState(
    data.properties.length > 0 ? data.properties : [{ ...emptyProperty }]
  );

  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleAdd = () => {
    setModalData([...modalData, { ...emptyProperty }]);
  };

  const handleDelete = (id) => {
    if (modalData.length === 1) {
      setModalData([{ ...emptyProperty }]);

      return;
    }

    setModalData(modalData.filter((elem) => elem.id !== id));
  };

  const handleSave = () => {
    const newData = [...modalData];
    const filtered = newData.filter((elem) => elem.name !== "" && elem.value !== "");
    
    setModalData([...filtered]);
    setData({ ...data, properties: [...filtered] });
    setIsModalOpened(false);
  };

  return (
    <Modal
      open={isModalOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
          <span>Add Properties</span>
          <span className={cssStyles.cross} onClick={() => setIsModalOpened(false)}>
            x
          </span>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.description}>
          Properties show up underneath your item, are clickable, and can be filtered in your
          collection&apos;s sidebar.
        </Typography>
        <section className={cssStyles.section}>
          <div className={cssStyles.fieldsWrapper}>
            <div className={cssStyles.titles}>
              <div>
                <span>Name</span>
              </div>
              <div>
                <span>Value</span>
              </div>
            </div>
            {modalData.map(({ name, value, id }, index) => (
              <PropertiesRow
                handleDelete={handleDelete}
                setModalData={setModalData}
                modalData={modalData}
                id={id}
                index={index}
                key={id}
                name={name}
                value={value}
              />
            ))}
          </div>
          <CustButton color="ghost" onClick={handleAdd} text="Add More" className={cssStyles.addMoreButton} />
        </section>
        <footer className={cssStyles.footer}>
          <CustButton color="primary" onClick={handleSave} text="Save" />
        </footer>
      </Box>
    </Modal>
  );
};
