export const textFields = [
  {
    title: "Name",
    label: "Item name",
    required: true,
    id: "name",
    maxLength: 100,
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
    required: true,
    id: "description",
    maxLength: 450,
  },
];

export const selects = [
  {
    title: "Collection",
    required: false,
    description: "This is the collection where your item will appear.",
    placeholder: "Select Collection",
    options: [],
    id: "collection",
  },
  // {
  //   title: "Supply",
  //   description: "The number of items that can be minted. No gas cost to you!",
  //   placeholder: "Select Collection",
  //   options: [],
  //   id: "supply",
  // },
  {
    title: "Blockchain",
    description: "This is the collection where your item will appear.",
    placeholder: "Select Blockchain",
    options: [
      {
        id: "bch1",
        text: "Polygon",
      },
      {
        id: "bch2",
        text: "Ethereum",
      },
    ],
    id: "blockchainType",
    required: true,
  },
  // {
  //   title: "Freeze Metadata",
  //   description:
  //     "Freezing your metadata will allow you to permanently lock and store all of this item’s content in decentralized file storage.",
  //   placeholder: "To freeze your metadata, you must create your item first.",
  //   options: [],
  //   id: "freezeMetadata",
  // },
];

export const uploadAndSwitchFields = [
  {
    title: "Properties",
    description: "Textual traits that show up as rectangles",
    icon: "/create-nft/Icon-Properties.svg",
    data: [
      {
        type: "speed",
        name: "fast",
        id: "1",
      },
      {
        type: "height",
        name: "Tall",
        id: "2",
      },
      {
        type: "wealth",
        name: "Very very very very rich",
        id: "3",
      },
      {
        type: "speed",
        name: "fast",
        id: "4",
      },
      {
        type: "height",
        name: "Tall",
        id: "5",
      },
      {
        type: "wealth",
        name: "Very very very very rich",
        id: "6",
      },
    ],
    type: "add",
    id: "properties",
  },
  {
    title: "Levels",
    description: "Numerical traits that show as a progress bar",
    icon: "/create-nft/Icon-Levels.svg",
    data: [
      {
        name: "speed",
        value: 5,
        maxValue: 7,
        id: "1",
      },
      {
        name: "height",
        value: 1,
        maxValue: 10,
        id: "2",
      },
    ],
    type: "add",
    id: "levels",
  },
  {
    title: "Stats",
    description: "Numerical traits that just show as numbers",
    icon: "/create-nft/Icon-Stats.svg",
    data: [
      {
        name: "speed",
        value: 5,
        maxValue: 7,
        id: "1",
      },
      {
        name: "height",
        value: 1,
        maxValue: 10,
        id: "2",
      },
    ],
    type: "add",
    id: "stats",
  },
  {
    title: "Unlockable Content",
    description: "Include unlockable content that can only be revealed by the owner of the item.",
    icon: "/create-nft/Icon-Unlockable.svg",
    type: "switch",
    id: "unlockableContent",
    defaultChecked: true,
  },
  {
    title: "Explicit & Sensitive Content",
    description: "Set this item as explicit and sensitive content",
    icon: "/create-nft/Icon-Explicit.svg",
    type: "switch",
    id: "isSensitiveContent",
  },
];
