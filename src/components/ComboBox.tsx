import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

type Tprops<T> = {
    setAdvanced?: (value: string) => void;
    optionsList: T[];
    opKey: keyof T;
    directUp?: boolean;
};

const ComboBox = <T,>({
    setAdvanced,
    optionsList,
    opKey,
    directUp = false,
}: Tprops<T>) => {
    const [selected, setSelected] = useState<T | undefined>();
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? optionsList
            : optionsList.filter((option: T) =>
                  String(option[opKey])
                      .toLowerCase()
                      .includes(query.toLowerCase())
              );

    return (
        <Combobox
            value={selected}
            onChange={(e: T) => {
                setSelected(e);
                if (setAdvanced) {
                    setAdvanced(String(e[opKey]));
                }
            }}
        >
            <div className="relative mt-1">
                <div className="">
                    <Combobox.Input
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        displayValue={(option: T) => String(option[opKey])}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options
                        className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ${directUp && "bottom-full"}`}
                    >
                        {filteredOptions.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-teal-600 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {String(option[opKey])}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                            ? "text-white"
                                                            : "text-teal-600"
                                                    }`}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default ComboBox;
