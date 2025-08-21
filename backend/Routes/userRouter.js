const express = require("express");
const router = express.Router();
const zod = require("zod");
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add this import
const authMiddleware = require("../middleware");
const Account = require("../Models/accountSchema");

// SignUp:
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  // Check if user exists
  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken",
    });
  }

  // Hash password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  // Create user with hashed password
  const user = await User.create({
    username: body.username,
    password: hashedPassword, // Save hashed password
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 5000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

// SignIn:
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid email or password format",
    });
  }

  // Find user by username
  const user = await User.findOne({
    username: body.username,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // Compare password with hashed password
  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  return res.json({
    message: "Successfully signed in",
    token: token,
  });
});

// Update user :
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/getUser", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  res.json(user);
});

module.exports = router;
