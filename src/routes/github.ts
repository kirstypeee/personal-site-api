import { Request, Response, Router } from "express";

import { StatusCodes } from "http-status-codes";
import axios from "axios";
import config from "../shared/config";
import githubContributionsRepository from "../model/githubContributionsRepository";

// Init router and path
const router = Router();

const getContributions = async () => {
  const headers = {
    Authorization: `bearer ${config.githubKey}`,
  };
  const body = {
    query: `query {
            user(login: "${config.githubUser}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
  };
  const { data } = await axios.request({
    url: "https://api.github.com/graphql",
    method: "POST",
    data: JSON.stringify(body),
    headers: headers,
  });
  return data;
};

// Add sub-routes
router.get("/contributions", async (req: Request, res: Response) => {
  try {
    const data = await getContributions();
    await githubContributionsRepository.updateContributions(data.data);
    return res.status(StatusCodes.OK).send(data);
  } catch (e) {
    try {
      const data = await githubContributionsRepository.getContributions();
      return res.status(StatusCodes.OK).send({ data });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e });
    }
  }
});

// Export the base-router
export default router;
