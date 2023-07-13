const db = require('./server/db/database.js');
const { green, red } = require('chalk');
const Task = require('./server/db/models/Task.js');
const User = require('./server/db/models/User.js');

const seedUsers = [
  {
    firstName: 'Will',
    lastName: 'Smith',
    imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/5ed663d153104f0007d6f014/0x0.jpg?format=jpg&crop=1032,1032,x15,y48,safe&height=416&width=416&fit=bounds',
    email: 'NoMoreChrisRock@hotmail.com',
    bio: 'He had to kill his dog in I am Legend... sad. ',
  },
  {
    firstName: 'A. A. Ron',
    lastName: 'Rod Gers',
    imageUrl: 'https://media.bleacherreport.com/image/upload/c_crop,h_0.99,w_1.00,x_0.00,y_0.00/w_970/v1678735230/sismyh1ssqefpqyrjqkk.png',
    email: 'trippy12@hotmail.com',
    bio: 'Shoulda won more SBs',
  },
  {
    firstName: 'Jerry',
    lastName: 'Springer',
    imageUrl: 'https://media.newyorker.com/photos/644c40432414c58c2884cba0/master/w_2560%2Cc_limit/doreen-springer-postscript-lead.jpg',
    email: 'SpringerShow@hotmail.com',
    bio: 'Jerry Jerry Jerry!',
  },
];

const seedTasks = [
  {
    description: 'Find out who is the father',
    category: 'fun',
    difficulty: '3',
    complete: false,
  },
  {
    description: 'try to make the Jets decent',
    category: 'work',
    difficulty: '5',
    complete: false,
  },
  {
    description: 'Slap Chris Rock',
    category: 'memes',
    difficulty: '2',
    complete: false,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    const createdTasks = await Promise.all(seedTasks.map((task) => Task.create(task)));

    const createdUsers = await Promise.all(seedUsers.map((user) => User.create(user)));

    await Promise.all(createdUsers.map((user, index) => user.addTask(createdTasks[index])));

    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('An error occurred during seeding:');
    console.error(err);
  }
};



module.exports = {
  seed,
}; 
