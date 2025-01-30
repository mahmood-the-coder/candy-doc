export function setRunningEditorDimensions()
{
  const content=document.body.querySelector(".candyDoc__content")
  const pageFooter=document.body.querySelector(".candyDoc__page").querySelector(".candyDoc__pageFooter");
  const pageHeader=document.body.querySelector(".candyDoc__page").querySelector(".candyDoc__pageHeader");
  document.body.querySelectorAll(".candyDoc__runningEditor").forEach(editor=>{
    editor.style.width=content.offsetWidth+"px";
  })

  document.body.querySelector(".candyDoc__runningFooterEditor").style.height=pageFooter.offsetHeight+"px"
  document.body.querySelector(".candyDoc__runningHeaderEditor").style.height=pageHeader.offsetHeight+"px"
}