import Fieldset from "@/components/Fieldset";

const DemoTips = () => {
    return (
        <Fieldset title={"Demo Tips:"} sFieldset="h-[27dvh] w-[20dvw]">
            <ol className="ml-4 list-disc text-indigo-600">
                <li>This website is only for demonstration</li>
                <li>
                    All the data stored in the database will be reset every hour
                </li>
                <li>
                    You can use other testing account listed in the staff page
                    to login or register a new one
                </li>
                <li>Test Account: test@gmail.com</li>
                <li>Test Password: 111</li>
            </ol>
        </Fieldset>
    );
};

export default DemoTips;
