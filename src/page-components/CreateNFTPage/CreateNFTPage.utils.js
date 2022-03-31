import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: "7px",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
      borderRadius: "7px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF4D",
        borderRadius: "7px",
      },
      "&:hover fieldset": {
        borderColor: "#FFFFFF4D",
        borderRadius: "7px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary)",
        borderRadius: "7px",
      },
    },
  },
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid var(--primary)",
    },
    "&.Mui-focused .MuiOutlinedInput-root": {
      border: "20px solid var(--primary)",
    },
    "&.MuiOutlinedInput-root:hover fieldset": {
      border: "1px solid #FFFFFF4D",
      borderRadius: "7px",
    },

    "&.MuiOutlinedInput-root fieldset": {
      border: "1px solid #FFFFFF4D",
      borderRadius: "7px",
    },
    "&.Mui-disabled span": {
      color: 'black'
    }
  },
}));

export const textFields = [
  {
    title: "Name",
    label: "Item name",
    required: true,
    id: "name",
  },
  {
    title: "External Link",
    description:
      "Stoke will include a link to this URL on this item’s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.",
    label: "https://youritemsite.io",
    id: "externalLink",
  },
  {
    title: "Description",
    description:
      "The description will be included on the item’s detail page underneath its image. Markdown syntax is supported.",
    label: "Provide a detail description of your item",
    multiline: true,
    id: "description",
  },
];

export const selects = [
  {
    title: "Collection",
    description: "This is the collection where your item will appear.",
    placeholder: "Select Collection",
    options: [
      {
        id: "op1",
        text: "Collection 1",
      },
      {
        id: "op2",
        text: "Collection 2",
      },
      {
        id: "op3",
        text: "None",
      },
    ],
    id: "collection",
  },
  {
    title: "Supply",
    description: "The number of items that can be minted. No gas cost to you!",
    placeholder: "Select Collection",
    options: [],
    id: "supply",
  },
  {
    title: "Blockchain",
    description: "This is the collection where your item will appear.",
    placeholder: "Select Collection",
    options: [],
    id: "blockchain",
  },
  {
    title: "Freeze Metadata",
    description:
      "Freezing your metadata will allow you to permanently lock and store all of this item’s content in decentralized file storage.",
    placeholder: "To freeze your metadata, you must create your item first.",
    options: [],
    id: "freezeMetadata",
  },
];

export const uploadAndSwitchFields = [
  {
    title: "Properties",
    description: "Textual traits that show up as rectangles",
    icon: "/create-nft/Icon-Properties.svg",
    type: "add",
    id: "up1",
  },
  {
    title: "Levels",
    description: "Numerical traits that show as a progress bar",
    icon: "/create-nft/Icon-Levels.svg",
    type: "add",
    id: "up2",
  },
  {
    title: "Stats",
    description: "Numerical traits that just show as numbers",
    icon: "/create-nft/Icon-Stats.svg",
    type: "add",
    id: "up3",
  },
  {
    title: "Unlockable Content",
    description: "Include unlockable content that can only be revealed by the owner of the item.",
    icon: "/create-nft/Icon-Unlockable.svg",
    type: "switch",
    id: "up4",
    defaultChecked: true,
  },
  {
    title: "Explicit & Sensitive Content",
    description: "Set this item as explicit and sensitive content",
    icon: "/create-nft/Icon-Explicit.svg",
    type: "switch",
    id: "up5",
  },
];
