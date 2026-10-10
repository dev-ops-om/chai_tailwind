
import { parseClass } from "./parser.js"
import { resolveValue } from "./resolver.js"
import { staticRules, dynamicRules } from "./rules.js"
import { colors } from "./constants/color.js" 
import { fontSizes } from "./constants/spacing.js"
// ─── Process a single element ────────────────────────────────────────────────

export function processElement(el) {

  // Get all classes on this element as a plain array
  const classes = Array.from(el.classList)

  classes.forEach((cls) => {

    
    if (!cls.startsWith("chai-")) return   //chai-p-4
  
    // Parse the class name into { raw, token, value }
    const parsed = parseClass(cls)

    
    if (!parsed) return

    const { raw, token, value } = parsed

   
    if (staticRules[raw]) {   //chai-flex-row
      Object.assign(el.style, staticRules[raw])
      el.classList.remove(cls)
      return  // done for this class, move to next
    }

   
    let cssProperty = dynamicRules[token]

    if (!cssProperty) {
      
      return
    }

    if (token === "border") {   //chai-border-white  chai-border-[8px]
      const isColor = (colors && colors[value]) || value.startsWith("[#") || value.startsWith("[rgb")
      cssProperty = isColor ? "borderColor" : "borderWidth"
      el.style.borderStyle = "solid" // ensure border is always visible
    }
if (token === "text" && fontSizes[value]) {   //chai-text-xl chai-text-white
  cssProperty = "fontSize"
}
    
  
    let cssValue = resolveValue(token, value)

    if (!cssValue) return

   
    if (Array.isArray(cssProperty)) {
      cssProperty.forEach((prop) => {
        el.style[prop] = cssValue   //px-4 
      })
    } else {
      el.style[cssProperty] = cssValue
    }

   
    el.classList.remove(cls)    //<div class="chai-bg-red chai-px-4" style="padding-left: 16px; padding-right: 16px;"></div>
  })
}


export function runEngine(root = document.body) {

  if (!root) return

 
  if (root === document.body && root.classList) {
    const hasChai = Array.from(root.classList).some((cls) =>
      cls.startsWith("chai-")
    )
    if (hasChai) processElement(root)
  }


  const elements = root.querySelectorAll("[class*='chai-']")    //css attribute selector optimiser
  elements.forEach(processElement)
}

