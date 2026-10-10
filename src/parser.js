export function parseClass(className) {
 
  if (!className.startsWith("chai-")) {
    return null;
  }
//Strip the "chai-" prefix
  // "chai-p-4" → "p-4"
  const raw = className.slice(5)   // "chai-".length === 5


  
  
  if (!raw) return null
  // Split by "-" to separate token from value
  // "p-4"         → ["p", "4"]
  // "bg-red-dark" → ["bg", "red", "dark"]

  const parts = raw.split("-")


  
  const token = parts[0]
  
  // This handles multi-word values like "red-dark", "1/2"
  // "bg-red-dark" → token: "bg", value: "red-dark"
  const value = parts.slice(1).join("-")
  return {
    raw,      // "p-4"    — the full string without "chai-"
    token,    // "p"      — the property identifier
    value,    // "4"      — the raw value (still needs resolving)
  }
}