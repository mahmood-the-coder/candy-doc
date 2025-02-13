

import { load } from "../DB/load.js";
import { renderHierarchy } from "../hierarchy-items/index.js";
import { header } from "./elements/header.js";
import { wrapper } from "./elements/wrapper.js";

export function getHierarchy() {
  load("user-data").then((data)=>{
    setTimeout(() => {
      renderHierarchy(data.hierarchyItems)
    }, 1);
    
  }).catch(()=>{
    renderHierarchy([{
      index: 0,
      id: "0",
      number: 1,
      name: "new page",
      type: "page",
      parentId: null,
      innerHTML: ""
    }])
  })
  return wrapper;
}

export function getHierarchyHeader() {
  return header;
}



