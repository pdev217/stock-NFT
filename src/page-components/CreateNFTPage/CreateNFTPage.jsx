import { useState, useEffect } from "react";
//classnames
import cn from "classnames";
//next
import { useRouter } from "next/router";
import Image from "next/image";
//axios
import axios from "axios";
//redux
import { useDispatch } from "react-redux";
import { open } from "../../redux/slices/errorSnackbarSlice";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//components
import { CustSwitch } from "../../components/CustSwitch/CustSwitch";
import { CustButton } from "../../components/CustButton/CustButton";
//utils
import { useStyles, textFields, selects, uploadAndSwitchFields } from "./CreateNFTPage.utils";
//styles
import styles from "./CreateNFTPage.module.css";
//ethers
import { ethers } from "ethers";
//hook
import useAuth from "../../hooks/useAuth";
//artifacts
import StokeArtifacts from "../../../artifacts/contracts/StokeNFT.sol/StokeNFT.json"
//@web3/react
import { useWeb3React } from "@web3-react/core";
//utils
import { toHex } from "../../utils";

var stokeContract;
const ethContractAddr = "0x244218500f847dbb4270f5f66399537c6bbd7a8d";
const polContractAddr = "0xdA054F032E40F04c9E564701B70631ebC8Ba4877";

export const CreateNFTPage = () => {
  const { account } = useAuth();
  const { library, chainId } = useWeb3React();
  const [disabledButton, setDisabledButton] = useState(true);
  const [enabledUnlockable, setEnsabledUnlockable] = useState(true);
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const etherNetwork = 3 //Ropsten testnet chainID
  const polygonNetwork = 80001 //Mumbai testnet chainId

  const [values, setValues] = useState({
    file: undefined,
    name: "",
    externalLink: "",
    description: "",
    collection: "none",
    properties: undefined,
    levels: undefined,
    stats: undefined,
    unlockable: true,
    explicit: false,
    supply: "none",
    blockchain: "none",
    freezeMetadata: "none",
  });
  
  const handleChange = (e, value, isFile) => {
    e.preventDefault();

    if (isFile) {
      const file = e.target.files[0];
      if (file.size < 100000) {
        setValues({ ...values, [value]: file });
      } else {
        dispatch(openError(`The uploaded file must be smaller than 100 mb`));
      }
    } else {
      setValues({ ...values, [value]: e.target.value });
    }
  };

  const pinFileToIPFS = async (data) => {
    const formData = new FormData();
    formData.append('file', data)
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            pinata_api_key: process.env.PINATA_API_KEY ,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_LEY
        }
    })

    return response.data.IpfsHash
  }

  const pinJSONToIPFS = async (JSONBody) => {
      const response = await axios.post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, JSONBody, {
          headers: {
              pinata_api_key: process.env.PINATA_API_KEY,
              pinata_secret_api_key: process.env.PINATA_SECRET_API_LEY
          }
      })
      return response.data.IpfsHash
  };

  useEffect(() => {
    if(account && library) {
      const signer = library.getSigner(account);
      const IStoke = new ethers.Contract(account, StokeArtifacts.abi, signer);
      stokeContract = IStoke.attach(polContractAddr);      
    }
  }, [account, library])

  const switchNetwork = async (network) => {
    await library?.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(network) }]
    });
  }

  const handleSave = async () => {
    if(chainId !== polygonNetwork) {
      switchNetwork(polygonNetwork).then((res) => {
        console.log('network is changed successfully')
      }).catch((err) => {
        console.log(err)
      })
    }
    if(library) {
      const imageHash = await pinFileToIPFS(values.file);
      const metaData = {
        image: `https://ipfs.io/ipfs/${imageHash}`,
        name: values.name,
        description: values.description,
        externalLink: values.externalLink
      }
      const metaDataHash = await pinJSONToIPFS(metaData)
      console.log(stokeContract)
      const transaction = await stokeContract.createToken(`https://ipfs.io/ipfs/${metaDataHash}`)
      .catch((err) => {
        console.log(err.message)
        dispatch(open(err.message)); //not working
      });
      transaction?.wait().then(res => console.log(res)).catch((e) => console.log(e))
    }else {
      router.push("/connect-wallet");
    }
  };

  const star = <span className={styles.star}>*</span>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainTitle}>
          <span>Create New Item</span>
        </div>
        <div className={styles.uploadItemSection}>
          <div className={styles.title}>
            <span>Image, Video, Audio, or 3D Model {star}</span>
          </div>
          <div className={styles.description}>
            <span>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </span>
          </div>
          <div className={styles.dragPlaceholder}>
            <input
              className={styles.uploadFileInput}
              type="file"
              onChange={(e) => handleChange(e, "file", true)}
              accept=".png, .jpg, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
            />
          </div>
        </div>
        {textFields.map(({ title, description, required, label, multiline, id, maxLength }) => (
          <div key={id} className={styles.section}>
            <div
              className={cn(styles.title, {
                [styles.name]: title === "Name",
              })}
            >
              <span>
                {title} {required && star}
              </span>
            </div>
            {description && (
              <div className={styles.description}>
                <span>{description}</span>
              </div>
            )}
            <TextField
              fullWidth
              id={label}
              label={label}
              variant="outlined"
              className={muiClasses.textField}
              value={values[id]}
              onChange={(e) => handleChange(e, id)}
              InputLabelProps={{
                style: { color: "#FFFFFF4D" },
              }}
              InputProps={{ style: { color: "white" } }}
              multiline={multiline}
              inputProps={{
                maxLength: maxLength || 524288,
              }}
              minRows={multiline && 3}
              maxRows={multiline && 10}
            />
          </div>
        ))}
        <div className={styles.section}>
          <div className={styles.title}>
            <span>
              {selects[0].title} {star}
            </span>
          </div>
          <div className={styles.description}>
            <span>{selects[0].description}</span>
          </div>
          <Select
            fullWidth
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              color: "white",
            }}
            onChange={(e) => handleChange(e, "collection")}
            value={values.collection}
            className={muiClasses.select}
          >
            <MenuItem disabled value="none">
              <span>{selects[0].placeholder}</span>
            </MenuItem>
            {selects[0].options.map(({ id, text }) => (
              <MenuItem key={id} value={text}>
                <span>{text}</span>
              </MenuItem>
            ))}
          </Select>
        </div>
        {uploadAndSwitchFields.map(({ title, description, icon, type, id, defaultChecked }) => (
          <div key={id} className={styles.underlinedSection}>
            <div>
              <div className={styles.fieldIcon}>
                <Image src={icon} layout="fill" alt={title} />
              </div>
              <div className={styles.fieldsTitleDescriptionWrapper}>
                <div className={styles.boldTitle}>
                  <span>{title}</span>
                </div>
                <div className={styles.description}>
                  <span>{description}</span>
                </div>
              </div>
              {type === "add" ? (
                <div className={styles.plus} onClick={() => {}}>
                  <span>+</span>
                </div>
              ) : (
                <CustSwitch
                  className={styles.switch}
                  defaultChecked={defaultChecked}
                  onChange={(e) => setEnsabledUnlockable(e.target.checked)}
                />
              )}
            </div>
            {title === "Unlockable Content" && (
              <div
                className={cn(styles.unlockable, {
                  [styles.unlockableDisplayed]: enabledUnlockable,
                  [styles.unlockableAbsent]: !enabledUnlockable,
                })}
              >
                <div
                  className={cn(styles.title, {
                    [styles.name]: title === "Name",
                  })}
                ></div>
                <TextField
                  fullWidth
                  id="Unlockable"
                  label="Unlockable Content"
                  variant="outlined"
                  className={muiClasses.textField}
                  value={values.unlockable}
                  onChange={(e) => handleChange(e, "unlockable")}
                  InputLabelProps={{
                    style: { color: "#FFFFFF4D" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  multiline
                />
              </div>
            )}
          </div>
        ))}
        {selects.slice(1).map(({ title, description, options, placeholder, id }) => (
          <div
            className={cn(styles.section, {
              [styles.sectionWithMarginTop]: title === "Supply",
              [styles.sectionWithBigMarginBottom]: title === "Freeze Metadata",
            })}
            key={id}
          >
            <div className={styles.title}>
              <span>{title}</span>
            </div>
            <div className={styles.description}>
              <span>{description}</span>
            </div>
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                color: "white",
              }}
              onChange={(e) => handleChange(e, id)}
              value={values[id]}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span>{placeholder}</span>
              </MenuItem>
              {options.map(({ id, text }) => (
                <MenuItem key={id} value={text}>
                  <span>{text}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
        <CustButton
          color="primary"
          text="Save"
          onClick={handleSave}
          className={styles.button}
        />
      </div>
    </div>
  );
};