const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    await User.deleteMany({});
    await Task.deleteMany({});

    const users = [
      { email: 'test1@example.com', password: 'password123' },
      { email: 'test2@example.com', password: 'password123' },
    ];

    const savedUsers = await User.insertMany(users);

    const tasks = [
      {
        title: 'Task 1',
        description: 'First task',
        priority: 'High',
        userId: savedUsers[0]._id,
      },
      {
        title: 'Task 2',
        description: 'Second task',
        priority: 'Medium',
        userId: savedUsers[0]._id,
      },
      {
        title: 'Task 3',
        description: 'Third task',
        priority: 'Low',
        userId: savedUsers[1]._id,
      },
    ];

    await Task.insertMany(tasks);
    console.log('Seed data inserted');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
