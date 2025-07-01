import { Request, Response, NextFunction } from "express";
import { IProject, Project } from "../models/projectModel.ts";
import { Admin, IAdmin } from "../models/adminModel.ts";
import { generateToken } from "../utils/token.ts";
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "../config/cloudinary.ts";
import { Certification, ICertification } from "../models/certificationModel.ts";
import { passport } from "../config/passport/index.ts";

// Use memory storage for multer (faster + cloudinary upload from buffer)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { username, userEmail, userPassword } = req.body;
//     const saltRounds = 10;
//     const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);

//     const newAdmin = new Admin({
//       username: username,
//       email: userEmail,
//       password: hashedPassword,
//     });

//     await newAdmin.save();
//     res.status(200).json({ message: "User created successfully." });
//   } catch (err) {
//     next(err);
//   }
// };

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ message: "Password required to login" });
      return;
    }

    const admin: IAdmin | null = await Admin.findOne();

    if (!admin) {
      res.status(404).json({ message: "No such admin exists to login." });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    const token = generateToken(admin._id.toString());

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({ message: "User login successful" });
  } catch (err) {
    next(err);
  }
};

export const googleSign = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
};

export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate("google", {
      session: false,
    })(req, res, () => {
      if (!req.user) {
        return res.redirect(process.env.FE_URL as string);
      }

      const token = req.user;

      res.cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      return res.redirect(`${process.env.FE_URL}/admin` as string);
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password } = req.body;
    if (!password) {
      res.status(400).json({ message: "Password required." });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const admin: IAdmin | null = await Admin.findOne();

    if (!admin) {
      res
        .status(404)
        .json({ message: "No such admin exists to change password." });
      return;
    }

    admin.password = hashedPassword;
    await admin.save();
    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    next(err);
  }
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tokenObj = (req as AuthenticatedRequest).user;
    const decodedToken = tokenObj?.id;
    const admin = await Admin.findOne();

    if (!decodedToken || !admin) {
      res.status(401).json({ message: "User not authorized." });
      return;
    }

    if (admin._id.toString() !== decodedToken) {
      res.status(401).json({ message: "User not authorized." });
      return;
    }

    res.status(200).json({ message: "User authorized." });
  } catch (err) {
    next(err);
  }
};

// export const createProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const {
//       fullName,
//       intro,
//       profileSummary,
//       profilePicture,
//       resume,
//       phone,
//       email,
//       district,
//       state,
//       country,
//       linkedIn,
//       gitHub,
//       instagram,
//       leetCode,
//       whatsApp,
//       languages,
//       frontend,
//       backend,
//       database,
//       cloud,
//       tools,
//       other,
//     } = req.body;

//     const profile = await Profile.create({
//       fullName,
//       intro,
//       profileSummary,
//       profilePicture,
//       resume,
//       contact: {
//         phone,
//         email,
//         address: {
//           district,
//           state,
//           country,
//         },
//       },
//       socialLinks: {
//         linkedIn,
//         gitHub,
//         leetCode,
//         email,
//         whatsApp,
//         instagram,
//       },
//       skills: {
//         languages: languages,
//         frontend: frontend,
//         backend: backend,
//         database: database,
//         cloud: cloud,
//         tools: tools,
//         other: other,
//       },
//     });

//     res.status(201).json({ message: "Profile created successfully" });
//   } catch (err) {
//     next(err)
//   }
// };

//project

export const addProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      title,
      category,
      description,
      technologies,
      gitHubLink,
      keyFeatures,
      liveLink,
      type,
      client,
    } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Thumbnail image is required" });
      return;
    }

    //Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { folder: "projects" },
      async (error, result) => {
        if (error || !result) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const newProject: IProject = new Project({
          title,
          category,
          thumbnail: result.secure_url,
          description,
          keyFeatures: JSON.parse(keyFeatures),
          technologies: JSON.parse(technologies),
          gitHubLink: JSON.parse(gitHubLink),
          liveLink,
          type,
          client,
        });

        await newProject.save();
        res.status(200).json({ message: "Project added successfully" });
      }
    );

    // Pipe file buffer into Cloudinary
    if (uploadResponse) {
      const stream = uploadResponse;
      stream.end(file.buffer);
    }
  } catch (err) {
    next(err);
  }
};

export const addCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, issuer, description, verificationLink } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "Certificate is required" });
      return;
    }
    if (!title || !issuer || !description || !verificationLink) {
      res.status(400).json({ message: "Every field is required" });
      return;
    }

    //Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { folder: "certifications" },
      async (error, result) => {
        if (error || !result) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const newCertification: ICertification = new Certification({
          title,
          issuer,
          certificate: result.secure_url,
          description,
          verificationLink,
        });

        await newCertification.save();
        res.status(200).json({ message: "Project added successfully" });
      }
    );

    // Pipe file buffer into Cloudinary
    if (uploadResponse) {
      const stream = uploadResponse;
      stream.end(file.buffer);
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ message: "user logout successfull" });
  } catch (err) {
    next(err);
  }
};
