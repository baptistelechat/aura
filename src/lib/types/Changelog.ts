import { ReactNode } from "react";

export type Changelog = {
  date: {
    month : "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    day : number;
    year : number;
  };
  content : ReactNode
}