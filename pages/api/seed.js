import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") 
    return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();

  const existing = await User.findOne({ email: "admin@shopelite.com" });
  if (existing) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const admin = await User.create({
    name: "Admin",
    email: "admin@shopelite.com",
    password: "admin123456",
    role: "admin",
  });

  res.status(201).json({ message: "Admin created!", email: admin.email });
}
