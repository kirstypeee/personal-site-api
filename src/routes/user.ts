import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response, Router } from "express";

import { isEmpty } from "lodash";
import userRepository from "@model/userRepository";

// Init router and path
const router = Router();

// Add sub-routes
router.post("/", async (req: Request, res: Response) => {
  const { name, company } = req.body;
  if (!name || !company) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
  try {
    const user = await userRepository.createUser({ name, company });
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e });
  }
});

// Export the base-router
export default router;
