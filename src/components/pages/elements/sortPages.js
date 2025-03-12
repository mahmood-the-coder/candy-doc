
import { hierarchyContainer } from "../../hierarchy/elements/container.js";
import { getHierarchyItems } from "../../hierarchy/elements/getHierarchyItems.js";
import { userData } from "../../user-data/userData.js";

export function sortPages()
{
  const items=[...getHierarchyItems(hierarchyContainer)].filter(i=>i.type!="parent" )
  const pagesWrapper=document.body.querySelector(".candyDoc__pagesWrapper");
  items.forEach(i=>{
    
    const page=pagesWrapper.querySelector(`[data-page-id='${i.id}']`)
    if(page)
    pagesWrapper.append(page)
  })

 

}