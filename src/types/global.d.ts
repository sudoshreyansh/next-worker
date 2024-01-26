declare module '*.worker.js' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.worker' {
  const classes: { readonly [key: string]: string }
  export default classes
}