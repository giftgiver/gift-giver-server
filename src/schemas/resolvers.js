const users = [
  {
    email: 'hpotter@gmail.com',
    password: 'nimbus2000'
  },
  {
    email: 'malfoy@aol.com',
    password: 'Slytherin4eva'
  }
];

module.exports = {
  Query: {
    users: () => users
  }
};
