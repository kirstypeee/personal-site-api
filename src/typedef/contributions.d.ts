import { ObjectId } from "mongodb";

export interface ContributionWeek {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
      weekday: number;
    }[];
    firstDay: string;
  }
  export interface Contributions {
    user: {
      name: string;
      contributionsCollection: {
        contributionCalendar: {
          colors: string[];
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  }

export interface MongoContributions extends Contributions {
  _id?: ObjectId;
}
