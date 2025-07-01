import { Request, Response, NextFunction } from "express";
import { Project, IProject } from "../models/projectModel.ts";

export const allProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProjects: IProject[] = await Project.find();
    if (allProjects.length === 0) {
      res.status(404).json({ message: "Zero projects found." });
      return;
    }
    res
      .status(200)
      .json({ data: allProjects, message: "All projects fetch success." });
  } catch (err) {
    next(err);
  }
};

export const specificProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const specificProject: IProject | null = await Project.findById(projectId);
    if (!specificProject) {
      res.status(404).json({ message: "Project not found." });
      return;
    }
    res.status(200).json({
      data: specificProject,
      message: "Specific project fetch success.",
    });
  } catch (err) {
    next(err);
  }
};
