

export function getTransform(target) {
 
  
  if (getComputedStyle(target).transform == "none" ) {
    return [
      ["0px", "0px", "0px"], // translate3d
      ["0", "1", "0", "0deg"], // rotate
      ["1", "1", "1"], // scale3d
      ["0deg", "0deg"], // skew
    ];
  } else {
    const translateTransform = target?.style?.transform
      ?.split(") ")[0]
      ?.replace("translate3d", "")
      ?.replace("(", "")
      ?.replace(")", "")
      ?.split(", ")??["0px", "0px", "0px"];
    const rotateTransform = target?.style?.transform
      ?.split(") ")[1]
      ?.replace("rotate3d", "")
      ?.replace("(", "")
      ?.replace(")", "")
      ?.split(", ")??["0", "1", "0", "0deg"];
    const scaleTransform = target?.style?.transform
      ?.split(") ")[2]
      ?.replace("scale3d", "")
      ?.replace("(", "")
      ?.replace(")", "")
      ?.split(", ")??["1", "1", "1"];
    const skewTransform = target?.style?.transform
      ?.split(") ")[3]
      ?.replace("skew", "")
      ?.replace("(", "")
      ?.replace(")", "")
      ?.split(", ")?? ["0deg", "0deg"];

      
       
    return [translateTransform, rotateTransform, scaleTransform, skewTransform];

  }
}
