const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_~"?+]{6,16}$/;
const birthdayRegexp = /^(0[1-9]|1\d|2[0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const phoneRegexp = /^\+380\d{9}$/;
const cityRegexp = /^[A-Z][A-Za-z\-]+$/;

const defaultAvatar =
  "https://res.cloudinary.com/dkmmhjqew/image/upload/v1696086608/default-avatar/Photo_default_ndssoh.png";

module.exports = {
  emailRegexp,
  passwordRegexp,
  birthdayRegexp,
  phoneRegexp,
  cityRegexp,
  defaultAvatar,
};
