import React from "react";
import type { FC } from "react";
import { Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const PageFooter: FC = () => {
    return (
        <Text
            style={tw(
                "text-base text-gray-600 absolute bottom-4 left-0 right-0 text-center"
            )}
            render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
            }
            fixed
        />
    );
};

export default PageFooter;
