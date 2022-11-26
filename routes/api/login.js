const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const sendGridAPiKey = process.env.SENDGRID_KEY;
const fromEmail = process.env.FROM_EMAIL;
const forgotPasswordTemplateId = process.env.FORGOTPASSWORD_TEMPLATEID;
const sgMail = require("@sendgrid/mail");
const config = require("config");
const { check, validationResult } = require("express-validator");
var ObjectId = require("mongodb").ObjectID;
const path = require("path");
const multipart = "connect-multiparty";
const User = require("../../models/admindetails");
const Project = require("../../models/project");
const Platform = require("../../models/platform");
const Lead = require("../../models/lead");
var multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const json2csv = require("json2csv").parse;
const { default: mongoose } = require("mongoose");
const { findOne } = require("../../models/admindetails");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// @route    GET /v1
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    var user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET /v1
// @desc     login
// @access   Public
router.post(
  "/",

  [
    check("email", "Registered email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              status: 0,
              response: "error",
              param: "email",
              msg: "Please use registered email",
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              status: 0,
              response: "error",
              param: "password",
              msg: "Please use correct password",
            },
          ],
        });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            status: 1,
            response: "successful",
            msg: "User is successfully logged in",
            token: token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST /v1/forgotPassword
// @desc     forgot password
router.post(
  "/forgotPassword",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email: email });



      if (!user) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              status: 0,
              response: "error",
              param: "email",
              msg: "Please use registered email",
            },
          ],
        });
      } else {
        let user_id = req.params.id;
        // const salt = await bcrypt.genSalt(10);
        var email_verification_code = Math.floor(
          100000 + Math.random() * 900000
        );

        var otp_expired = new Date();
        otp_expired.setMinutes(otp_expired.getMinutes() + 5);
        const passwordObject = {};
        passwordObject.otp_expired = otp_expired;
        passwordObject.otp = email_verification_code;
        console.log(passwordObject.otp);
        passwordObject.updated_at = new Date();

        try {
          let personalData = {};

          personalData = await User.findOneAndUpdate(
            { _id: user._id },
            { $set: passwordObject }
          );

         


          // Using upsert option (creates new doc if no match is found):

          sgMail.setApiKey(sendGridAPiKey);
          const msg = {
            to: 'fakherzaheri@gmail.com',
            //to: email,
            from: {
              email: "fakher@frescowebservices.com",
              // fromEmail,
              },
            subject: "Forgot Password",
            html:
          '<style>.first{width:100%}</style>'+
          '<div class="row" style="background-color:#f3f3f3;border: 3px solid #c3c3c3;">'+
            '<div style="text-align: center;padding:7px;">'+
              '<h1> Your Otp is: '+passwordObject.otp+ '.</h1>'+
                
            '</div>'+
              
            
              '<div class="row col-md-12" style="text-align:center;background-color:#c3c3c3;color:white;height: auto;padding-top: 0px;">'+
                '<div style="margin-top:6px;margin-bottom:6px;padding-top:6px;padding: 5px;color: black;font-family: -webkit-pictograph;font-size: 14px;font-weight: 600;">'+
                'Copyright © 2022 LMS , All rights reserved'+
              '</div>'+
            '</div>'+
          
          '</div>',
          };
          sgMail.send(msg);
          res.json({
            success: true,
                response: "successful",
                msg: "Please check your email for OTP verification.",
                id: user._id,
                user_email: email,
          });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// @access   Public
// router.post(
//   "/forgotPassword",
//   [check("email", "Please include a valid email").isEmail()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     const { email } = req.body;

//     try {
//       let user = await User.findOne({ email: email });

//       if (!user) {
//         return res.status(400).json({
//           success: false,
//           errors: [
//             {
//               status: 0,
//               response: "error",
//               param: "email",
//               msg: "Please use registered email",
//             },
//           ],
//         });
//       } else {
//         let user_id = req.params.id;
//         // const salt = await bcrypt.genSalt(10);
//         var email_verification_code = Math.floor(
//           100000 + Math.random() * 900000
//         );

//         var otp_expired = new Date();
//         otp_expired.setMinutes(otp_expired.getMinutes() + 5);
//         const passwordObject = {};
//         passwordObject.otp_expired = otp_expired;
//         passwordObject.otp = email_verification_code;
//         console.log(passwordObject.otp);
//         passwordObject.updated_at = new Date();

//         try {
//           let personalData = {};

//           personalData = await User.findOneAndUpdate(
//             { _id: user._id },
//             { $set: passwordObject }
//           );

//           // Using upsert option (creates new doc if no match is found):

//           sgMail.setApiKey(sendGridAPiKey);
//           const msg = {
//             to: "japkirat66@gmail.com",
//             // to: email,
//             from: fromEmail,
//             templateId: forgotPasswordTemplateId,
//             dynamicTemplateData: {
//               subject: "Forgot Password",
//               otp: passwordObject.otp,
//             },
//           };
//           sgMail.send(msg, (error, result) => {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log("Send email to user Done!");
//               return res.json({
//                 success: true,
//                 response: "successful",
//                 msg: "Please check your email for OTP verification.",
//                 data: {
//                   id: user._id,
//                   email: email,
//                 },
//               });
//             }
//           });
//         } catch (err) {
//           console.error(err.message);
//           res.status(500).send("Server Error");
//         }
//       }
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// @route    POST v1/verifyOtp/:id
// @desc     Registered user otp verification
// @access   Public
router.post(
  "/verifyOtp/:id",
  [check("otp", "OTP must be of 6 digit numbers").matches(/^[0-9]{6}$/)],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { otp } = req.body;
    let user_id = req.params.id;
    try {
      function time_gap(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.round(diff);
      }
      let userData = await User.findOne({ _id: user_id });

      // console.log(userData);
      if (userData) {
        let otp_expired = userData.otp_expired;

        let currentDateTime = new Date();
        let expiredDateTime = new Date(otp_expired);
        var expiringDifference = time_gap(currentDateTime, expiredDateTime);
        //console.log(expiringDifference);
        if (otp == userData.otp) {
          if (expiringDifference < 0) {
            var userDetails = {};
            userDetails.otp = null;
            userDetails.otp_expired = currentDateTime;
            var user_otpToken = Math.random().toString(36).substring(2, 10);
            userDetails.otp_token = user_otpToken;

            await User.findOneAndUpdate(
              { _id: user_id },
              { $set: userDetails }
            );

            res.json({
              success: true,
              msg: "OTP verified successfully",
              data: {
                id: user_id,
                otptoken: user_otpToken,
              },
            });
          } else {
            res.status(400).send({
              success: false,
              errors: [
                {
                  msg: "OTP get expired",
                  param: "otp",
                  location: "body",
                },
              ],
            });
          }
        } else if (otp != userData.otp) {
          res.status(400).send({
            success: false,
            errors: [
              {
                msg: "OTP is not valid",
                param: "otp",
                location: "body",
              },
            ],
          });
        }
      } else {
        res.status(400).send({
          success: false,
          errors: [
            {
              msg: "No Otp in this id",
              param: "id",
              location: "url",
            },
          ],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        success: false,
        errors: [
          {
            msg: "Server error",
            param: "server",
            location: "body",
          },
        ],
      });
    }
  }
);

// @route    PUT /v1/reset_password/:id/:otptoken
// @desc     reset pssword after otp verification
// @access   Public
router.put(
  "/reset_password/:id/:otptoken",
  [
    [
      check(
        "password",
        "New password should have( one uppercase , one lower case, one special char, one digit and min 6 char long )"
      ).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
      check(
        "confirm_password",
        "Confirm Password should matched with new password"
      ).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    var err = [];
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { password, confirm_password } = req.body;
    let user_id = req.params.id;
    let user_otptoken = req.params.otptoken;
    let user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            status: 0,
            response: "error",
            param: "_id",
            msg: "Something Went Wrong..",
          },
        ],
      });
    }

    if (user.otp_token !== user_otptoken) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            response: "error",
            param: "otp_token",
            msg: "Link Expired",
          },
        ],
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            status: 0,
            response: "error",
            param: "confirm_password",
            msg: "Confirm password does not matched with new password",
          },
        ],
      });
    }

    // Build passwordObject
    const salt = await bcrypt.genSalt(10);

    const passwordObject = {};
    if (password) passwordObject.password = await bcrypt.hash(password, salt);
    passwordObject.otp_token = null;
    passwordObject.updated_at = new Date();

    try {
      let personalData = null;

      // Using upsert option (creates new doc if no match is found):
      personalData = await User.findOneAndUpdate(
        { _id: user_id },
        { $set: passwordObject }
      );

      if (personalData) {
        res.json({
          success: true,
          status: 1,
          response: "successful",
          msg: "Password is updated successfully",
        });
      } else {
        res.json({
          success: false,
          status: 0,
          response: "error",
          msg: "No record found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET /v1//leadsPerPlatform
// @desc     dashboard, leads per platform
// @access   Private
router.get("/leadsPerPlatform/:platform_id", auth, async (req, res) => {
  try {
    const platform_id  = req.params.platform_id;

    // 1) Total leads per platform
    let leadPerPlatform = Lead.find({ platform_id: platform_id });

    leadPerPlatform.count(function (err, totalLeadsPerPlatform) {
      if (err) {
        res.json({
          success: false,
          status: 0,
          response: "error",
          msg: "There is some error, Please try Again.",
        });
      } else {
        res.json({
          success: true,
          status: 1,
          response: "successful",
          msg: "Data fetched successfully",
          data:{ 
            totalLeadsPerPlatform :  totalLeadsPerPlatform,
            platform_id : platform_id,
          }
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

// @route    GET /v1//leadsPerProject
// @desc     dashboard, leads per project
// @access   Private
router.get("/leadsPerProject/:project_id/:platform_id", auth, async (req, res) => {
  try {
    const project_id  = req.params.project_id;
    const platform_id  = req.params.platform_id;


    // 2) Total Leads for every project by platform
    let LeadsPerProjectByPlatform = {};
    if (platform_id) {
      LeadsPerProjectByPlatform = Lead.find({
        project_id: project_id,
        platform_id: platform_id,
      });
    } else {
      LeadsPerProjectByPlatform = Lead.find({ project_id: project_id });
    }
    LeadsPerProjectByPlatform.count(function (
      err,
      totalLeadsPerProjectByPlatform
    ) {
      if (err) {
        res.json({
          success: false,
          status: 0,
          response: "error",
          msg: "There is some error, Please try Again.",
        });
      } else {
        res.json({
          success: true,
          status: 1,
          response: "successful",
          msg: "Data fetched successfully",
          data: {
            totalLeadsPerProjectByPlatform :totalLeadsPerProjectByPlatform,
            project_id : project_id, 
            platform_id : platform_id,
            }
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

// @route    GET /v1/project
// @desc     projects
// @access   Private
router.get("/project", auth, async (req, res) => {
  try {
    const limitValue = 10;

    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * limitValue;
    const endIndex = page * limitValue;
    const result = {};
    if (endIndex < (await Project.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limitValue: limitValue,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limitValue: limitValue,
      };
    }
    result.project = await Project.find().limit(limitValue).skip(startIndex);
    let projectList = await Project.find();
    let projectListActive = await Project.find({project_status : 1});
    let projectListUnactive = await Project.find({project_status : 0});


    res.json({
      success: true,
      response: "successful",
      msg: "Data fetched",
      data: { result, projectList,projectListActive, projectListUnactive  },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.post(
  "/addProject",
  auth,
  [
    check("project_name", "Please enter the Project Name").not().isEmpty(),
    check("company_name", "Please enter the company name").not().isEmpty(),
    check("contact_no", "Please enter valid number").isLength({
      min: 10,
      max: 10,
    }),
    check("email", "Please include a valid email").isEmail(),
    check("address", "Please enter the company address").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { project_name, company_name, contact_no, email, address } = req.body;

    try {
      var created_at = new Date();
      var addProject = {};

      if (project_name) addProject.project_name = project_name;
      if (company_name) addProject.company_name = company_name;
      if (contact_no) addProject.contact_no = contact_no;
      if (email) addProject.email = email;
      if (address) addProject.address = address;
      addProject.created_at = created_at;

      var checkNameExists = await Project.findOne({
        project_name: project_name,
      });
      if (!checkNameExists) {
        await Project.findOneAndUpdate(
          { project_name: project_name },
          { $set: addProject },
          { new: true, upsert: true }
        );

        //  await  newProject.save()

        res.json({
          success: true,
          response: "successful",
          msg: "Project added succesfuly",
        });
      } else {
        res.status(400).send({
          success: false,
          errors: [
            {
              msg: "Name already exists",
              param: "project_name",
              location: "body",
            },
          ],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        success: false,
        errors: [
          {
            msg: "Server error",
            param: "server",
            location: "body",
          },
        ],
      });
    }
  }
);

router.get("/projectById/:project_id", auth, async (req, res) => {
  try {
    const project_id = req.params.project_id;

    let project = await Project.findOne({ _id: project_id });

    res.json({
      success: true,
      response: "successful",
      msg: "Records fetched successfully.",
      data: project,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

router.put("/project/:id", auth, async (req, res) => {
  const {
    project_name,
    company_name,
    contact_no,
    email,
    address,
    project_status,
  } = req.body;
  let project_id = req.params.id;

  try {
    var editProject = {};

    if (project_name) editProject.project_name = project_name;
    if (company_name) editProject.company_name = company_name;
    if (contact_no) editProject.contact_no = contact_no;
    if (email) editProject.email = email;
    if (address) editProject.address = address;
    if (project_status) editProject.project_status = project_status;

    let projectUpdated = await Project.findOneAndUpdate(
      { _id: project_id },
      { $set: editProject }
    );

    if (projectUpdated) {
      res.json({
        success: true,
        response: "successful",
        msg: "Project Succesfuly Updated",
      });
    } else {
      return res.status(400).json({
        success: false,
        errors: [
          {
            status: 0,
            response: "error",
            param: "editProject",
            msg: "Project was not updated",
          },
        ],
      });
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.put("/deleteProject/:project_id", auth, async (req, res) => {
  try {
    const project_id = req.params.project_id;

    let deletedProject = await Project.deleteOne({ _id: project_id });
    if (deletedProject)
   { res.json({
      success: true,
      response: "successful",
      msg: "Project Deleted successfully.",
      data: deletedProject,
    });}
    else{
      return res.status(400).json({
        success: false,
        errors: [
          {
            status: 0,
            response: "error",
            param: "project_id",
            msg: "project id is invalid. Try Again",
          },
        ],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

router.get("/platform", auth, async (req, res) => {
  try {
    let platform = await Platform.find();
    res.json({
      success: true,
      response: "successful",
      msg: "Data fetched",
      data: platform,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.post(
  "/addPlatform",
  auth,
  [check("platform_name", "Please enter the Platform Name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { platform_name } = req.body;
    let platformName = platform_name.toLowerCase();
    try {
      var created_at = new Date();
      var addPlatform = {};

      if (platform_name) addPlatform.platform_name = platformName;
      addPlatform.created_at = created_at;
      var checkNameExists = await Platform.findOne({
        platform_name: platformName,
      });
      if (!checkNameExists) {
        await Platform.findOneAndUpdate(
          { platform_name: platformName },
          { $set: addPlatform },
          { new: true, upsert: true }
        );

        res.json({
          success: true,
          response: "successful",
          msg: "Platform added succesfuly",
        });
      } else {
        res.status(400).send({
          success: false,
          errors: [
            {
              msg: "Platform Name already exists",
              param: "platform_name",
              location: "body",
            },
          ],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        success: false,
        errors: [
          {
            msg: "Server error",
            param: "server",
            location: "body",
          },
        ],
      });
    }
  }
);

router.put("/platform/:id", auth, async (req, res) => {
  const { platform_name } = req.body;
  let platform_id = req.params.id;

  try {
    var editPlatform = {};

    if (platform_name) editPlatform.platform_name = platform_name;

    let platformUpdated = await Platform.findOneAndUpdate(
      { _id: platform_id },
      { $set: editPlatform }
    );

    if (platformUpdated) {
      res.json({
        success: true,
        response: "successful",
        msg: "Platform Succesfuly Updated",
      });
    } else {
      return res.status(400).json({
        success: false,
        errors: [
          {
            status: 0,
            response: "error",
            param: "editPlatform",
            msg: "Platform was not updated",
          },
        ],
      });
    }
  } catch (err) {
    // console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.get("/leads", auth, async (req, res) => {
  try {
    const limitValue = 10;

    const page = parseInt(req.query.page);
    const sortData = { created_at: -1 };
    const startIndex = (page - 1) * limitValue;
    const endIndex = page * limitValue;
    const result = {};
    if (endIndex < (await Lead.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limitValue: limitValue,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limitValue: limitValue,
      };
    }

    const { project_id, platform_id } = req.body;

    result.lead = await Lead.find()
      .limit(limitValue)
      .skip(startIndex)
      .sort(sortData);
    if (project_id)
      result.lead = await Lead.find({ project_id: project_id })
        .limit(limitValue)
        .skip(startIndex)
        .sort(sortData);
    if (project_id)
      if (platform_id)
        result.lead = await Lead.find({
          project_id: project_id,
          platform_id: platform_id,
        })
          .limit(limitValue)
          .skip(startIndex)
          .sort(sortData);

    res.json({
      success: true,
      response: "successful",
      msg: "Records fetched successfully.",
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

router.post(
  "/addLead",
  auth,
  [
    check("project_ids", "Please Select a project").not().isEmpty(),
    check("platform_ids", "Please Select a platform").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      project_ids,
      platform_ids,
      name,
      email,
      phone_no,
      lead_date,
      graduation_status,
      city,
      lead_state,
    } = req.body;

    try {
      var created_at = new Date();

      var newLead = new Lead({
        project_id: project_ids,
        platform_id: platform_ids,
        name: name,
        email: email,
        phone_no: phone_no,
        lead_date: lead_date,
        graduation_status: graduation_status,
        city: city,
        lead_state: lead_state,
        created_at: created_at,
      });

      const data = await newLead.save();

      res.json({
        success: true,
        response: "successful",
        msg: "Lead added succesfuly",
        data: data,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        success: false,
        errors: [
          {
            msg: "Server error",
            param: "server",
            location: "body",
          },
        ],
      });
    }
  }
);

router.get("/leadById/:id", auth, async (req, res) => {
  try {
    const lead_id = req.params.id;

    let lead = await Lead.findOne({ _id: lead_id });
    if(lead)
   { res.json({
      success: true,
      response: "successful",
      msg: "Records fetched successfully.",
      data: lead,
    });
  } else {
    return res.status(400).json({
      success: false,
      errors: [
        {
          status: 0,
          response: "error",
          param: "id",
          msg: "Lead was not fetched",
        },
      ],
    });
  }



  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

router.post(
  "/importLeads/:project_id/:platform_id",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.json({
          success: false,
          status: 0,
          response: "error",
          msg: "Please upload a csv file",
        });
      }
      const project_id = req.params.project_id;
      const platform_id = req.params.platform_id;
      const fileRows = [];
      // console.log("File is : ",req.file);
      var importLeads;
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", async (row) => {
          fileRows.push(row);
          var newLead = new Lead({
            project_id: project_id,
            platform_id: platform_id,
            name: row.name,
            email: row.email,
            phone_no: row.phone_no,
            lead_state: row.lead_state,
            lead_date: row.lead_date,
            graduation_status: row.graduation_status,
            city: row.city,
            created_at: new Date(),
          });

          importLeads = await newLead.save();
          // console.log(importLeads);
        })

        .on("end", () => {
          fs.unlinkSync(req.file.path);
          if (fileRows.length == 0) {
            return res.json({
              success: false,
              status: 0,
              response: "error",
              msg: "Please upload valid file",
            });
          }
        });

      res.json({
        success: true,
        status: 1,
        response: "successful",
        msg: "File details updated successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errors: [
          {
            response: "error",
            msg: "Server Error",
          },
        ],
      });
    }
  }
);

router.put(
  "/editLeads/:id",
  auth,
  async (req, res) => {
    

    const { name, email, phone_no, graduation_status, city, lead_state } =
      req.body;
    let lead_id = req.params.id;

    try {
      var updated_at = new Date();
      var editLead = {};

      if (name) editLead.name = name;
      if (email) editLead.email = email;
      if (phone_no) editLead.phone_no = phone_no;
      if (graduation_status) editLead.graduation_status = graduation_status;
      if (city) editLead.city = city;
      if (lead_state) editLead.lead_state = lead_state;
      editLead.updated_at = updated_at;

      let leadUpdated = await Lead.findOneAndUpdate(
        { _id: lead_id },
        { $set: editLead }
      );

      if (leadUpdated) {
        res.json({
          success: true,
          response: "successful",
          msg: "Lead Succesfuly Updated",
        });
      } else {
        return res.status(400).json({
          success: false,
          errors: [
            {
              status: 0,
              response: "error",
              param: "editLead",
              msg: "Lead was not updated",
            },
          ],
        });
      }
    } catch (err) {
      // console.error(err.message);
      res.status(500).send({
        success: false,
        errors: [
          {
            msg: "Server error",
            param: "server",
            location: "body",
          },
        ],
      });
    }
  }
);

router.delete("/deleteLead/:lead_id", auth, async (req, res) => {
  try {
    const lead_id = req.params.lead_id;

    let deletedLead = await Lead.deleteOne({ _id: lead_id });

    res.json({
      success: true,
      response: "successful",
      msg: "Lead Deleted successfully.",
      data: deletedLead,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findOne({ _id: userId }, { name: 1, email: 1 });
    if (user) {
      res.json({
        success: true,
        response: "successful",
        msg: "Data fetched",
        data: user,
      });
    } else {
      res.status(400).json({
        success: false,
        response: "error",
        msg: "No user found",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.put("/editProfile", auth, async (req, res) => {
  const { name } = req.body;

  try {
    var profileData = await User.findOne({ _id: req.user.id });

    if (name) profileData.name = name;

    // return console.log("profile data" , profileData)

    let userUpdated = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: profileData }
    );

    res.json({
      success: true,
      response: "successful",
      msg: "User Profile Succesfuly Updated",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      success: false,
      errors: [
        {
          msg: "Server error",
          param: "server",
          location: "body",
        },
      ],
    });
  }
});

router.put(
  "/changePassword",
  [
    auth,
    [
      check("previous_password", "Password is not correct").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
      check(
        "new_password",
        "New password should have( one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long )"
      ).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
      check(
        "confirm_password",
        "Confirm Password should matched with new password"
      ).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    var err = [];
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { previous_password, new_password, confirm_password } = req.body;

    const user = await User.findOne({ _id: req.user.id });
    const isMatch = await bcrypt.compare(previous_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            success: false,
            response: "error",
            param: "previous_password",
            msg: "Invalid previous password",
          },
        ],
      });
    }
    if (new_password !== confirm_password) {
      return res.status(400).json({
        errors: [
          {
            success: false,
            response: "error",
            param: "confirm_password",
            msg: "Confirm password does not matched with new password",
          },
        ],
      });
    }

    // Build passwordObject
    const salt = await bcrypt.genSalt(10);

    const passwordObject = {};
    if (new_password)
      passwordObject.password = await bcrypt.hash(new_password, salt);
    passwordObject.updated_at = new Date();

    try {
      let personalData = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: passwordObject }
      );
      res.json({
        success: true,
        response: "successful",
        msg: "Password is updated successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/reports", auth, [
  check("project_id", "Please enter the Project Name").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const result = {};
    let start;
    let end;
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate() + 1;
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const { project_id, platform_id, start_date, end_date } = req.body;
    if (start_date) {
      start = start_date;
    } else {
      start = new Date(2022-5-30);
    }
    if (end_date) {
      end = end_date;
    } else {
      end = year + "-" + month + "-" + date;
    }

  

    if (project_id)
      result.report = await Lead.find({
        project_id: project_id,
        lead_date: { $gte: start, $lt: end },
      });

    if (project_id)
      if (platform_id)
        result.report = await Lead.find({
          project_id: project_id,
          platform_id: platform_id,
          lead_date: { $gte: start, $lt: end },
        });

    res.json({
      success: true,
      response: "successful",
      msg: "Report fetched successfully.",
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errors: [
        {
          response: "error",
          msg: "Server Error",
        },
      ],
    });
  }
});

module.exports = router;

//  use this to add a new admin
router.post(
  '/signup',
  async (req, res) => {
    const {
      name,
      email,
      password,
     } = req.body;

 try {
     var created_at = new Date();
     const salt = await bcrypt.genSalt(10);

     var userDetails = {};
     userDetails.name = name;

     userDetails.email = email;

     userDetails.password = await bcrypt.hash(password, salt);
     userDetails.created_at = created_at;
  console.log(userDetails);

    var new_user = new User({
        name:userDetails.name,
        email:userDetails.email,
        password:userDetails.password,
        created_at:userDetails.created_at

  })
  console.log("start saving");

  const dts  = await  new_user.save()

  res.json({
    success:true,
    message:"dts",

  });

 }
 catch (err) {
  console.error(err.message);
  res.status(500).send({
    success:false,
    "errors": [
      {
          "msg": "number not saved",
          "param": "server",
          "location": "body"
      }
  ]});
}
  });
