//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { Row } from "./Row";
//styles
import { styles as jsStyles } from "./AddStatsModal.utils";
import cssStyles from "./AddStatsModal.module.css";

const fakeData = [
  {
    name: "Name",
    score: 3,
    id: "1",
  },
  {
    name: "Speed",
    score: 1,
    id: "2",
  },
  {
    name: "Speed",
    score: 4,
    id: "3",
  },
];

export const AddStatsModal = ({ isModalOpened, setIsModalOpened, data = fakeData }) => {
  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleAdd = () => {};

  const handleSave = () => {};

  return (
    <Modal
      open={isModalOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
          <span>Add Stats</span>
          <span className={cssStyles.cross}>x</span>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.description}>
          Stats show up underneath your item, are clickable, and can be filtered in your collection’s sidebar.
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
            {data.map(({ name, score, id }) => (
              <Row name={name} value={score} id={id} key={id} />
            ))}
          </div>
          <CustButton color="ghost" onClick={handleAdd} text="Add More" className={cssStyles.addMoreButton} />
        </section>
        <footer className={cssStyles.footer} >
          <CustButton color="primary" onClick={handleSave} text="Save" />
        </footer>
      </Box>
    </Modal>
  );
};
