import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUserValidator, registerUserValidator } from '../validators/authValidator.js';
import { UserModel } from '../models/authModel.js';
import { sendEmail } from '../utils/mailing.js';

//registering a new user
export const registerUser = async (req, res) => {
  try {
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.message });
    }

    const userExisting = await UserModel.findOne({
      $or: [
        {
          firstName: value.firstName,
          lastName: value.lastName
        },
        { email: value.email }
      ]
    });

    if (userExisting) {
      return res.status(409).json('User already exists')
    }

    //generating profile pic using initials
    const initials = `${value.firstName.charAt(0)}${value.lastName.charAt(0)}`.toUpperCase();
    const profilePictureUrl = `https:ui-avatars.com/api/?name=${initials}&background=random`;


    //password hashing
    const hashingPassword = await bcrypt.hash(value.password, 10);

    //new user 
    const incomingUser = await UserModel.create({
      ...value,
      password: hashingPassword,
      profilePicture: profilePictureUrl
    });

    res.status(201).json({
      message: 'User registered successfully',
      data: incomingUser
    })


    //email sending
    try {
      await sendEmail(
        incomingUser.email,
        "Welcome to AdsTrek",

        ` <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AdsTrek!</title>
   <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
     }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
       background-color: #0073e6;
       color: white;
       padding: 15px;
       text-align: center;
       font-size: 24px;
       border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        color: #333;
        line-height: 1.6;
     }
      .button {
        display: inline-block;
        background-color: #0073e6;
        color: white;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 5px;
        margin-top: 10px;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #777;
      }
      .featured {
        background-color: #f8f8f8;
        padding: 15px;
        margin-top: 20px;
        border-radius: 8px;
      }
      .featured img {
        width: 100%;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <div class="header">
        Welcome to AdsTrek!
      </div>
      
      <div class="content">
        <h2>Hi ${incomingUser.firstName},</h2>
        <p>We're thrilled to have you on board! 🎉</p>

        <p><strong>AdsTrek</strong> is the best place to <strong>buy, sell, and discover amazing deals<strong> near you. Get ready to connect with thousands of users and find everything you need in one place!</p>

        <h3>🚀 Get Started in 3 Easy Steps:</h3>
        <ol>
          <li><strong>Complete Your Profile</strong> – Add a profile picture and update your details.</li>
          <li><strong>Post Your First Ad</strong> – It's quick, free, and reaches a huge audience.</li>
          <li><strong>Browse Great Deals</strong> – Find products, services, and opportunities.</li>
        </ol>

        <a href="https://your-platform-link.com/profile" class="button">Complete Your Profile</a>

        <div class="featured">
          <h3>🔥 Featured Listings</h3>
          <img src="https://your-image-link.com/sample-ad.jpg" alt="Featured Ad">
          <p>Discover top deals in your area. Don't miss out!</p>
          <a href="https://your-platform-link.com/featured" class="button">View Listings</a>
        </div>

        <h3>📱 Get the App</h3>
        <p>For the best experience, download our mobile app and get real-time updates on your ads and messages.</p>
        <a href="https://your-app-link.com" class="button">Download Now</a>

        <h3>🎁 Invite & Earn</h3>
        <p>Refer friends and earn rewards! Share your referral link and get exclusive bonuses.</p>
        <a href="https://your-platform-link.com/referral" class="button">Invite Friends</a>

      </div>

      <div class="footer">
        <p>Need help? Our support team is available 24/7. <a href="mailto:support@your-platform.com">Contact Us</a></p>
        <p>&copy; 2025 AdsTrek. All rights reserved.</p>
      </div>
    </div>

  </body>
  </html>
  `);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//login user
export const loginUser = async (req, res) => {
  try {
    const { error, value } = loginUserValidator.validate(req.body)
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    //if user email exists
    const user = await UserModel.findOne({
      email: value.email
    });
    if (!user) {
      return res.status(404).json('User not found')
    };

    //comparing password
    const isAMatch = await bcrypt.compare(value.password, user.password);
    if (!isAMatch) {
      return res.status(401).json('Invalid credentials');
    }

    //generating jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' });

    res.status(200).json({ token,
      user: {
        role: user.role,
        email: user.email,
      }
     });
  } catch (error) {
    res.status(500).json({message: "Error logging in"});
  }
}
