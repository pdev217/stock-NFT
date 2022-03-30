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
    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: '2px solid var(--primary)'
      },
      "&.Mui-focused .MuiOutlinedInput-root":
      {
        border: '20px solid var(--primary)'
      },
    "&.MuiOutlinedInput-root:hover fieldset": {
      border: '1px solid grey',
      borderRadius: "7px",
    },

    "&.MuiOutlinedInput-root fieldset": {
      border: '1px solid grey',
      borderRadius: "7px",
    },

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
    label: "Select Collection",
    options: [],
    id: "collection",
  },
  {
    title: "Supply",
    description: "The number of items that can be minted. No gas cost to you!",
    label: "Select Collection",
    options: [],
    id: "supply",
  },
  {
    title: "Blockchain",
    description: "This is the collection where your item will appear.",
    label: "Select Collection",
    options: [],
    id: "blockchain",
  },
  {
    title: "Freeze Metadata",
    description:
      "Freezing your metadata will allow you to permanently lock and store all of this item’s content in decentralized file storage.",
    label: "To freeze your metadata, you must create your item first.",
    options: [],
    id: "freezeMetadata",
  },
];
