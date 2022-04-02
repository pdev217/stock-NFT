import { useState } from "react";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { StatsOrLevelsRow } from "./StatsOrLevelsRow";
//styles
import { styles as jsStyles } from "./AddToNFTModal.utils";
import cssStyles from "./AddToNFTModal.module.css";
//uuid
import { v4 } from "uuid";

export const AddStatsOrLevelsModal = ({
  title,
  description,
  isModalOpened,
  setIsModalOpened,
  setData,
  data,
}) => {
  const [modalData, setModalData] = useState(title === "Add Stats" ? data.stats : data.levels);

  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleAdd = () => {
    setModalData([
      ...modalData,
      {
        name: "",
        score: undefined,
        maxScore: undefined,
        id: v4(),
      },
    ]);
  };

  const handleDelete = (id) => {
    if (modalData.length === 1) {
      setModalData([
        {
          name: "",
          score: undefined,
          maxScore: undefined,
          id: v4(),
        },
      ]);

      return;
    }

    setModalData(modalData.filter((elem) => elem.id !== id));
  };

  const handleSave = () => {
    title = "Add Stats"
      ? setData({ ...data, stats: [...modalData] })
      : setData({ ...data, levels: [...modalData] });
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
          <span>{title}</span>
          <span className={cssStyles.cross} onClick={() => setIsModalOpened(false)}>
            x
          </span>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.description}>
          {description}
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
            {modalData.map(({ name, score, id }) => (
              <StatsOrLevelsRow name={name} value={score} id={id} key={id} handleDelete={handleDelete} />
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
