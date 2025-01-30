import { getInspector } from "../../inspector/index.js";
import { getSelected } from "../../selection/index.js";
import { wrapper } from "./elements/wrapper.js";

export function getNumberInput(label="",showLabel=true,value=0,min=Infinity,max=Infinity,step=1,action=()=>{})
{
    const clone=wrapper.cloneNode(true);
    clone.querySelector("input").value=value;
    clone.querySelector("input").max=max;
    clone.querySelector("input").min=min;
    clone.querySelector("input").step=step;
    clone.querySelector(".label").innerText=showLabel?label:"";
    window.addEventListener("mouseup",(e)=>{
        const selected=getSelected();
        if(!selected)return;
        if(getInspector().contains(e.target))return;
        if(!selected.dataset)return;
        const val=selected?.dataset[label?.replace(" ","_")]?? value;
        clone.querySelector("input").value=val;

    })
    clone.addEventListener("input",(e)=>{
        let value=parseFloat(clone.querySelector("input").value);
        console.log(value);
        
        if(value>max)
        {
            value=max;
        }
        if(value<min)
        {
            value=min
        }
        clone.querySelector("input").value=value
        const selected=getSelected();
        if(!selected)return;
        selected.dataset[label.replace(" ","_")]=clone.querySelector("input").value;
      
        
        action(value)    })
    clone.querySelector(".add").addEventListener("mousedown",(e)=>{
        
        let value=parseFloat(clone.querySelector("input").value);
        if(value+step>max)return;
        value+=step;
        clone.querySelector("input").value=value
        const selected=getSelected();
        if(!selected)return;
        selected.dataset[label.replace(" ","_")]=clone.querySelector("input").value;
      
        
        action(value)

    })
    clone.querySelector(".minus").addEventListener("mousedown",(e)=>{
        let value=parseFloat(clone.querySelector("input").value);
        if(value-step<min)return;
        value-=step;
        clone.querySelector("input").value=value
        const selected=getSelected();
        if(!selected)return;
        selected.dataset[label.replace(" ","_")]=clone.querySelector("input").value;
        action(value)
    })
   
    return clone;

}