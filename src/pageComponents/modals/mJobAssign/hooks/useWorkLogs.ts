import { atWorkLogs } from "@/configs/atoms";
import { TworkLogs } from "@/configs/schema/workSchema";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useWorkLogs = (oriWorkLogs: TworkLogs[]) => {
    const [workLogs, setWorkLogs] = useAtom(atWorkLogs);
    useEffect(() => {
        setWorkLogs(oriWorkLogs);
    }, [oriWorkLogs, setWorkLogs]);

    return { workLogs, setWorkLogs };
};

export default useWorkLogs;
