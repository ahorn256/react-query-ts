import createFastContext from "../../FastContext";
import { initialStore } from "./FCEStore";

export const {
  Provider: FCEProvider,
  useStore: useFCEStore,
} = createFastContext(initialStore);
