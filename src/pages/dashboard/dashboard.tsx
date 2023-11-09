import React, {
    FC,
    Suspense,
    useEffect,
    useState,
    useMemo,
    memo,
    useCallback,
    useRef,
} from "react";
import { Await, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import PDFTemplate from "@/PDF/template1";

const T1 = memo(
    ({
        data: init,
        setData,
    }: {
        data: string;
        setData: (v: string) => void;
    }) => {
        //const [data, setData] = useState("");
        const [values, setValues] = useState(init);
        return (
            <section>
                <div className="col-span-2 h-20">
                    <label htmlFor="dataInput">Input data:</label>
                    <input
                        id="dataInput"
                        name="dataInput"
                        type="text"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        className="w-full border-2 border-gray-300"
                    />
                </div>
                <button
                    className="bg-indigo-100"
                    onClick={() => {
                        setData(values);
                    }}
                >
                    update
                </button>
            </section>
        );
    }
);

const Dashboard: FC = () => {
    const loaderData = useLoaderData() as { content: any };
    const [data, setData] = useState("");

    const memoizedSetData = useCallback((value: string) => {
        setData(value);
    }, []);

    const DashboardContent = () => {
        return (
            <div className="grid grid-cols-8 gap-x-2">
                <section className="col-span-3">
                    <T1 data={data} setData={memoizedSetData} />
                </section>
                <section className="col-span-5">
                    <PDFTemplate />
                </section>
            </div>
        );
    };

    return (
        <div className="mx-2 px-0 border-2 border-dashed border-blue-600">
            <div className="">Dashboard</div>
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={loaderData.content}>
                    {(loadedContent) => {
                        return <DashboardContent />;
                    }}
                </Await>
            </Suspense>
        </div>
    );
};

export default Dashboard;
