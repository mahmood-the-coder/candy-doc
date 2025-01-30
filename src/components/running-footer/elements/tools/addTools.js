import { absoluteNumber } from "../box/absoluteNumber.js";
import { bookTitle } from "../box/bookTitle.js";
import { chapterTitle } from "../box/chapterTitle.js";
import { pageTitle } from "../box/pageTitle.js";
import { relativeNumber } from "../box/relativeNumber.js";

export const addTools = document.createElement("div");
addTools.classList.add("candyDoc__runningFooterToolsWrapper");
addTools.append(
  bookTitle,
  chapterTitle,
  pageTitle,
  absoluteNumber,
  relativeNumber
);
