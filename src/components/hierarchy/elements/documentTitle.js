import { UpdateDynamicText } from "../../dynamic-text/index.js";

export const title = document.createElement("input");
title.classList.add("candyDoc__hierarchyDocumentTitle");
title.id = "candy-doc-title";
title.placeholder = "Document Title . . .";
title.dir = "ltr";
title.addEventListener("input", (e) => {
  document.title = e.target.value;
  UpdateDynamicText()
});
