import { load } from "../DB/load.js";
import {
  getHierarchyItems,
  renderHierarchy,
} from "../hierarchy-items/index.js";
import { header } from "./elements/header.js";
import { wrapper } from "./elements/wrapper.js";
export function getHierarchy() {
  load("user-data").then((data) => {
    renderHierarchy(data.hierarchyItems);
  }).catch(()=>{
    
    renderHierarchy(getHierarchyItems());
  });
  return wrapper;
}

export function getHierarchyHeader() {
  return header;
}
