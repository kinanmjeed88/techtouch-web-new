// FIX: The reference to "vite/client" was causing a type resolution error.
// It has been replaced with a specific module declaration to provide types for assets
// imported with the `?url` suffix, which is a feature used in this project.
declare module '*?url' {
  const url: string;
  export default url;
}
