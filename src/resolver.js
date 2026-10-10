import { spacing, fontSizes, borderWidths } from "./constants/spacing.js"
import { colors } from "./constants/color.js"

export function resolveValue(token, value) {


    
  if (value.startsWith("[") && value.endsWith("]")) {
    return value.slice(1, -1)   // strip the brackets → "200px", "#ff6b6b"
  }
  
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/")
    const percent = (Number(numerator) / Number(denominator)) * 100
    return `${parseFloat(percent.toFixed(2))}%`
  }

  if (token === "opacity") {
    return String(Number(value) / 100)
  }
  
  if (token === "z") {
    return value
  }
  
  if (token === "text") {
    if (fontSizes[value]) return fontSizes[value]
    
  }
    
  
  if (token === "border") {

    if (colors && colors[value]) {
        return colors[value]
    }
    const width = borderWidths[value] || `${value}px`
    return borderWidths[value] || (value ? `${value}px` : "1px")
  }
 
  if (token === "bg" || token === "text") {
    if (colors[value]) return colors[value]
   
    return value
  }
 
  if (spacing[value]) return spacing[value]
  
  return value
}