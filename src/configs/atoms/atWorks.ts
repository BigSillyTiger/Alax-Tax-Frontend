import { atomWithReset } from "jotai/utils";
import { TassignedWork, TworkLogs } from "../schema/workSchema";

const atWorkLogs = atomWithReset<TworkLogs[]>([]);
const atAssignedWorks = atomWithReset<TassignedWork[]>([]);

export { atWorkLogs, atAssignedWorks };
