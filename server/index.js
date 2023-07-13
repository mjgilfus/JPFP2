const port = process.env.PORT || 3000;
const app = require('./app');
const { seed } = require('../seed.js');
seed()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(err => {
    console.error("Error while seeding");
    console.error(err.stack);
    app.listen(port, () => console.log(`listening on port ${port}`));
  });