export const imageDataArray = [
  {
    text: "Profile Image",
    form: "round",
    id: "profileImage",
  },
  {
    text: "Profile Banner",
    form: "square",
    id: "profileBanner",
  },
];

export const textFields = [
  {
    id: "username",
    label: "Enter Username",
    title: "Username",
    withError: true,
    maxLength: 45,
    required: true,
  },
  {
    id: "bio",
    label: "Describe your mission here",
    minRows: 2,
    title: "Bio",
    maxLength: 140,
  },
  {
    id: "email",
    label: "Enter Email",
    title: "Email Address",
    withError: true,
    required: true,
  },
];
