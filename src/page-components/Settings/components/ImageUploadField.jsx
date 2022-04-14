import { useRef, useState, useEffect } from "react";
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
//spinner
import { Oval } from "react-loader-spinner";
//styles
import styles from "../Settings.module.css";

export const ImageUploadField = ({ text, form, profileImages, setProfileImages, type }) => {
  const dispatch = useDispatch();

  const [assetUrl, setAssetUrl] = useState(`/create-token/empty-${type}.png`);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    profileImages[type]
      ? setAssetUrl(`${process.env.BACKEND_ASSETS_URL}/${type + "s"}/${profileImages[type]}`)
      : setAssetUrl(`/create-nft/empty-${type}.png`);
  }, [profileImages]);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
      setIsLoading(false);
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
      inputRef.current.value = "";
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
          {isLoading ? (
            <Oval
              ariaLabel="loading-indicator"
              height={70}
              width={70}
              strokeWidth={3}
              color="var(--dark-grey)"
              secondaryColor="var(--light-grey)"
            />
          ) : (
            <img src={assetUrl} alt="avatar" className={styles.image} />
          )}
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
