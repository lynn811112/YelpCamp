const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Datebase connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            // your user id
            author: '623c49b752a876fd9902f7c2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzohswqdq/image/upload/v1648468077/YelpCamp/rncks6ecixojsixednxy.jpg',
                    filename: 'YelpCamp/rncks6ecixojsixednxy',
                },
                {
                    url: 'https://res.cloudinary.com/dzohswqdq/image/upload/v1648373930/YelpCamp/t1k0gufvxlcfms9xvgif.jpg',
                    filename: 'YelpCamp/t1k0gufvxlcfms9xvgif',
                }]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})