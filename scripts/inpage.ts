import { Provider } from "./provider";
console.log("Hello");

const ethereum = new Provider();
console.log(ethereum);
(window as any).ethereum2 = ethereum;
