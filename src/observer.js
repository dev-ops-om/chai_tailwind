

import { runEngine } from "./engine.js"
export function startObserver() {

 
  const observer = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

      
      mutation.addedNodes.forEach((node) => {

        
        if (node.nodeType !== 1) return

     
        runEngine(node)
      })
    })
  })

 
  observer.observe(document.body, {
    childList: true,  
    subtree: true,     
  })


  return observer
}