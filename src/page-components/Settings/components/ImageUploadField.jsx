import { useRef } from "react";
// redux
import { open as openError } from "../../../redux/slices/errorSnackbarSlice";
import { useDispatch } from "react-redux";
import { setImage, setBanner } from "../../../redux/slices/userDataSlice";
//axios
import axios from "axios";
//classnames
import cn from "classnames";
//components
import { CustButton } from "../../../components/CustButton/CustButton";
//styles
import styles from "../Settings.module.css";
import { useState } from "react";
import { useEffect } from "react";

export const ImageUploadField = ({ text, form, profileImages, setProfileImages, type }) => {
  const dispatch = useDispatch();

  const [assetUrl, setAssetUrl] = useState(`/noImage.png`);
  const inputRef = useRef();

  useEffect(() => {
    profileImages[type]
      ? setAssetUrl(`${process.env.BACKEND_WITHOUT_API}/assets/${type + "s"}/${profileImages[type]}`)
      : setAssetUrl("/noImage.png");
  }, [profileImages]);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiUrl = `${process.env.BACKEND_URL}/users/upload/${type}`;

      const { data } = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-type": "multipart/form-data; boundary=MyBoundary",
        },
      });
      setProfileImages({ ...profileImages, [type]: data });
      type === "profileImage" ? dispatch(setImage(data)) : dispatch(setBanner(data));
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const deleteImage = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${process.env.BACKEND_URL}/users/delete/${type}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      setProfileImages({ ...profileImages, [type]: null });
      type === "profileImage" ? dispatch(setImage(null)) : dispatch(setBanner(null));
      inputRef.current.value = '';
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  return (
    <div className={styles.imageFieldWrapper}>
      <div className={styles.imageTitle}>
        <span>{text}</span>
      </div>
      <div className={styles.imageButtonsWrapper}>
        <div
          className={cn(styles.profileImage, {
            [styles.imageRounded]: form === "round",
            [styles.imageSquare]: form === "square",
          })}
        >
          <img src={assetUrl} alt="avatar" className={styles.image} />
        </div>
        <div className={styles.profileImageButtons}>
          <input
            type="file"
            ref={inputRef}
            className={styles.imageInput}
            id={`file-input-${text}`}
            onChange={handleUpload}
          />
          <CustButton
            text="Upload Image"
            color="primary"
            className={styles.imageButton}
            fullWidth
            onClick={() => inputRef.current.click()}
          />
          <CustButton text="Delete Image" color="red" className={styles.imageButton} onClick={deleteImage} />
        </div>
      </div>
    </div>
  );
};
