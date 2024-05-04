const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./db/models/User");

// Controller function for user registration
exports.registerUser = async (req, res, next) => {
  try {
    // Extract user data from request body
    const {
      username,
      email,
      password,
      mobile,
      age,
      contact,
      website,
      interests,
      hobbies,
    } = req.body;
    console.log("req.body  :  ", req.body);

    // Validate request body
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobile,
      age,
      contact,
      website,
      interests,
      hobbies,
    });

    // Save the user to the database
    await newUser.save();
    // Return success response
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success response with JWT token
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    next(error);
  }
};

// Controller function for getting user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    // Extract user email from request body
    const userEmail = req.query.email;
    console.log("userEmail  :  ", userEmail);
    // Retrieve user profile from database
    const user = await User.findOne({ email: userEmail });

    // Return user profile
    res.status(200).json(user);
  } catch (error) {
    console.log("error");
    next(error);
  }
};

// Controller function for updating user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { mobile, age, contact, website, interests, hobbies } = req.body;
    const userProfileData = {
      mobile,
      age,
      contact,
      website,
      interests,
      hobbies,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      userProfileData,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Controller function for uploading user profile photo
exports.uploadUserProfilePhoto = async (req, res, next) => {
  console.log("Request to upload profile photo received");

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const currentUser = req.currentUser;

    currentUser.profilePhotoUrl = req.file.path; 

    await currentUser.save();

    // Return success response
    return res
      .status(200)
      .json({ message: "Profile photo uploaded successfully." });
  } catch (error) {
    next(error);
  }
};
