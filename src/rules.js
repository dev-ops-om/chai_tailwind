export const dynamicRules = {
  // ─── Spacing ─────────────────────────────
  "p":   "padding",
  "pt":  "paddingTop",
  "pb":  "paddingBottom",
  "pl":  "paddingLeft",
  "pr":  "paddingRight",
  "m":   "margin",
  "gap": 'gap',
  "mt":  "marginTop",
  "mb":  "marginBottom",
  "ml":  "marginLeft",
  "mr":  "marginRight",

  
  "px":  ["paddingLeft",  "paddingRight"],
  "py":  ["paddingTop",   "paddingBottom"],

  
  "mx":  ["marginLeft",  "marginRight"],
  "my":  ["marginTop",   "marginBottom"],
  // ─── Sizing ──────────────────────────────
  "w":   "width",
  "h":   "height",
  // ─── Colors ──────────────────────────────
  "bg":   "backgroundColor",
  "text": "color",          
  // ─── Typography ──────────────────────────
  "font": "fontWeight",
  "leading": "lineHeight",
  "tracking": "letterSpacing",
  // ─── Borders ─────────────────────────────
  "border":  "border",
  "rounded": "borderRadius",

  // ─── Opacity ─────────────────────────────
  "opacity": "opacity",
  // ─── Shadows ─────────────────────────────
  "shadow": "boxShadow",
  // ─── Cursor ──────────────────────────────
  "cursor": "cursor",
  // ─── Z-Index ─────────────────────────────
  "z": "zIndex",
}


export const staticRules = {
  // ── Display ──
  "flex":         { display: "flex" },
  "block":        { display: "block" },
  "inline":       { display: "inline" },
  "inline-block": { display: "inline-block" },
  "hidden":       { display: "none" },
  "grid":         { display: "grid" },
  // ── Flex Direction ──
  "flex-row":     { flexDirection: "row" },
  "flex-col":     { flexDirection: "column" },
  "flex-row-rev": { flexDirection: "row-reverse" },
  "flex-col-rev": { flexDirection: "column-reverse" },
  // ── Flex Wrap ──
  "flex-wrap":    { flexWrap: "wrap" },
  "flex-nowrap":  { flexWrap: "nowrap" },
  // ── Justify Content ──
  "justify-start":   { justifyContent: "flex-start" },
  "justify-center":  { justifyContent: "center" },
  "justify-end":     { justifyContent: "flex-end" },
  "justify-between": { justifyContent: "space-between" },
  "justify-around":  { justifyContent: "space-around" },
  "justify-evenly":  { justifyContent: "space-evenly" },
  // ── Align Items ──
  "items-start":    { alignItems: "flex-start" },
  "items-center":   { alignItems: "center" },
  "items-end":      { alignItems: "flex-end" },
  "items-stretch":  { alignItems: "stretch" },
  "items-baseline": { alignItems: "baseline" },
  // ── Align Self ──
  "self-start":     { alignSelf: "flex-start" },
  "self-center":    { alignSelf: "center" },
  "self-end":       { alignSelf: "flex-end" },
  "self-stretch":   { alignSelf: "stretch" },
  // ── Text Align (also a static rule) ──
  "text-left":    { textAlign: "left" },
  "text-center":  { textAlign: "center" },
  "text-right":   { textAlign: "right" },
  "text-justify": { textAlign: "justify" },


"w-fit": { width: "fit-content" },
"h-40vh": { height: "40vh" },
"leading-tight": { lineHeight: "1.1" },


  // ── Font Size ──
  "text-xs":   { fontSize: "12px" },
  "text-sm":   { fontSize: "14px" },
  "text-base": { fontSize: "16px" },
  "text-lg":   { fontSize: "18px" },
 
  


  // ── Font Weight ──
  "font-thin":       { fontWeight: "100" },
  "font-light":      { fontWeight: "300" },
  "font-normal":     { fontWeight: "400" },
  "font-medium":     { fontWeight: "500" },
  "font-semibold":   { fontWeight: "600" },
  "font-bold":       { fontWeight: "700" },
  "font-extrabold":  { fontWeight: "800" },
  "font-black":      { fontWeight: "900" },
  // ── Text Transform ──
  "uppercase":    { textTransform: "uppercase" },
  "lowercase":    { textTransform: "lowercase" },
  "capitalize":   { textTransform: "capitalize" },
  // ── Text Decoration ──
  "underline":    { textDecoration: "underline" },
  "line-through": { textDecoration: "line-through" },
  "no-underline": { textDecoration: "none" },
  // ── Overflow ──
  "overflow-hidden":  { overflow: "hidden" },
  "overflow-auto":    { overflow: "auto" },
  "overflow-scroll":  { overflow: "scroll" },
  "overflow-visible": { overflow: "visible" },
  // ── Position ──
  "relative": { position: "relative" },
  "absolute": { position: "absolute" },
  "fixed":    { position: "fixed" },
  "sticky":   { position: "sticky" },
  "static":   { position: "static" },
  
  // ── Border Radius shortcuts ──
  "rounded-none":   { borderRadius: "0px" },
  "rounded-sm":     { borderRadius: "2px" },
  "rounded":        { borderRadius: "4px" },
  "rounded-md":     { borderRadius: "6px" },
  "rounded-lg":     { borderRadius: "8px" },
  "rounded-xl":     { borderRadius: "12px" },
  "rounded-2xl":    { borderRadius: "16px" },
  "rounded-full":   { borderRadius: "9999px" },

  // ── Sizing shortcuts ──
  "w-full":         { width: "100%" },
  "w-screen":       { width: "100vw" },
  "h-full":         { height: "100%" },
  "h-screen":       { height: "100vh" },
"border": {
  borderStyle: 'solid',
  borderWidth: '1px'
},
  // ── Cursor shortcuts ──
  "cursor-pointer":     { cursor: "pointer" },
  "cursor-default":     { cursor: "default" },
  "cursor-not-allowed": { cursor: "not-allowed" },
}