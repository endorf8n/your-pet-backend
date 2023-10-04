const category = ['sell', 'lost-found', 'in-good-hands'];
const sex = ['male', 'female',];
const nameRegexp = /^[a-zA-Z]{2,16}$/;
const titleRegexp = /^[a-zA-Z\s.]{4,64}$/;
const dateRegexp = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
const cityRegexp = /^[A-ZА-Я][a-zA-Zа-яА-Я0-9\s]*$/;

module.exports = {
  category,
  sex,
  nameRegexp,
  titleRegexp,
  dateRegexp,
  cityRegexp,
}