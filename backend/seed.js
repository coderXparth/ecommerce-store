import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

const seed = async () => {
  try {
    await connectDB();

    // ✅ Clear old data
    await User.deleteMany();
    await Product.deleteMany();

    // ✅ Create Admin and User
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // hashed in pre-save hook
      role: "admin",
    });

    const user = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: "user123",
      role: "user",
    });

    // ✅ Seed Products with images
    const products = await Product.insertMany([
      {
        name: "Chaat",
        description: "Delicious Indian street food with tangy flavors",
        price: 100,
        image: "/images/chaat.jpg",  // 👈 path in frontend/public/images
        countInStock: 20,
      },
      {
        name: "Chai",
        description: "Hot brreze of heaven",
        price: 50,
        image: "/images/chai.jpg",
        countInStock: 15,
      },
      {   name: "Jalebi",
        description: "Sweet",
        price: 150,
        image: "/images/jalebi.jpg",
        countInStock: 25,
      },
      {   name: "Faluda",
        description: "Sweet",
        price: 150,
        image: "/images/ice.jpg",
        countInStock: 25,
      }, {   name: "Sandwich",
        description: "Sweet",
        price: 150,
        image: "/images/sandwich.jpg",
        countInStock: 25,
      },
    ]);

    console.log("✅ Database seeded successfully!");
    console.log({
      adminEmail: admin.email,
      adminPwd: "admin123",
      userEmail: user.email,
      userPwd: "user123",
      productCount: products.length,
    });

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
