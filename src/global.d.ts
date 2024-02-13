declare module '*.runtime.js' {
  const WorkerFactories: { [key: string]: () => Worker };
  export default WorkerFactories;
}