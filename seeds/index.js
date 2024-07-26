const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
main().catch((err) => console.log(err, "connection Error"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

  console.log("Database Connected");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "669de63e159788579af2d27f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
      ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dckxodt7u/image/upload/v1721773491/YelpCamp/hvctkjfu0phezvqodxjb.jpg",
          filename: "YelpCamp/hvctkjfu0phezvqodxjb",
        },
        {
          url: "https://res.cloudinary.com/dckxodt7u/image/upload/v1721773491/YelpCamp/jbtyt7jicriha7ravvkr.jpg",
          filename: "YelpCamp/jbtyt7jicriha7ravvkr",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatum deleniti hic ratione possimus maiores accusamus inventore dignissimos ducimus, debitis nostrum accusantium nesciunt tenetur. Perferendis sapiente optio illo sed labore!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
