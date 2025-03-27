import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUserValidator, registerUserValidator } from '../validators/authValidator.js';
import { UserModel } from '../models/authModel.js';
import { sendEmail } from '../utils/mailing.js';
import { profilePicture } from '../middlewares/profile_upload.js';

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
      let emailSubject = "Welcome to EASYBUY";
      let emailBody = "";
  
      if (incomingUser.role === "vendor") {
          emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to EASYBUY, Vendor!</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
              .header { background-color: #0073e6; color: white; padding: 15px; text-align: center; font-size: 24px; border-radius: 8px 8px 0 0; }
              .content { padding: 20px; color: #333; line-height: 1.6; }
              .button { display: inline-block; background-color: #0073e6; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; margin-top: 10px; }
              .footer { text-align: center; padding: 15px; font-size: 14px; color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">Welcome to EASYBUY, ${incomingUser.firstName}!</div>
              <div class="content">
                <h2>Hi ${incomingUser.firstName},</h2>
                <p>We're excited to have you as a vendor on EASYBUY! 🚀</p>
                <p>Start posting your ads and connect with thousands of buyers looking for amazing deals.</p>
                <h3>🛍️ Next Steps:</h3>
                <ul>
                  <li><strong>Complete Your Vendor Profile</strong> – Build trust with buyers.</li>
                  <li><strong>Post Your First Ad</strong> – Start showcasing your products.</li>
                  <li><strong>Engage with Customers</strong> – Sell and grow your business.</li>
                </ul>
                <a href="https://your-platform-link.com/vendor-dashboard" class="button">Go to Dashboard</a>
              </div>
              <div class="footer">
                <p>Need help? Our support team is available 24/7. <a href="mailto:techtrekgh04@gmail.com">Contact Us</a></p>
                <p>&copy; 2025 EASYBUY. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
          `;
      } else {
          emailBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to EASYBUY, User!</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
              .header { background-color: #0073e6; color: white; padding: 15px; text-align: center; font-size: 24px; border-radius: 8px 8px 0 0; }
              .content { padding: 20px; color: #333; line-height: 1.6; }
              .button { display: inline-block; background-color: #0073e6; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; margin-top: 10px; }
              .footer { text-align: center; padding: 15px; font-size: 14px; color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">Welcome to EASYBUY, ${incomingUser.firstName}!</div>
              <div class="content">
                <h2>Hi ${incomingUser.firstName},</h2>
                <p>We're thrilled to have you on board! 🎉</p>
                <p>Find amazing deals, connect with sellers, and enjoy a seamless shopping experience.</p>
                <h3>🚀 Get Started:</h3>
                <ul>
                  <li><strong>Complete Your Profile</strong> – Personalize your experience.</li>
                  <li><strong>Browse Great Deals</strong> – Find products, services, and opportunities.</li>
                  <li><strong>Stay Updated</strong> – Get notified about the best offers.</li>
                </ul>
                <a href="https://your-platform-link.com/profile" class="button">Explore EASYBUY</a>
              </div>
              <div class="footer">
                <p>Need help? Our support team is available 24/7. <a href="mailto:techtrekgh04@gmail.com">Contact Us</a></p>
                <p>&copy; 2025 EASYBUY. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
          `;
      }
  
      await sendEmail(incomingUser.email, emailSubject, emailBody);
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
        id: user.id
      }
     });
  } catch (error) {
    res.status(500).json({message: "Error logging in"});
  }
}

export const getAuthenticatedUser = async (req, res, next) => {
  try {
    const userId = req.auth?.id; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await UserModel.findById(userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); 
    res.status(500).json({ error: error.message });
  }
};

