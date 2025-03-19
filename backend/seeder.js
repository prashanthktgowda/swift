const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Section = require('./models/Section');

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
});

const sections = [
    {
        title: 'Ride with Uber',
        description: 'Request a ride and get to your destination quickly and safely.',
        buttonText: 'Ride Now',
        route: '/ride',
    },
    {
        title: 'Drive with Uber',
        description: 'Earn money by driving with Uber on your schedule.',
        buttonText: 'Drive Now',
        route: '/drive',
    },
    {
        title: 'Uber for Business',
        description: 'Manage rides and meals for your employees with Uber for Business.',
        buttonText: 'Learn More',
        route: '/business',
    },
    {
        title: 'About Uber',
        description: 'Learn more about our mission, vision, and values.',
        buttonText: 'About Us',
        route: '/about',
    },
];

const seedDatabase = async () => {
    try {
        await Section.deleteMany();
        await Section.insertMany(sections);
        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
