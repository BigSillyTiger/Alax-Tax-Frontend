import React, { memo } from "react";
import {
    PDFViewer,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const TestPdf = memo(({ data }: { data: string }) => {
    return (
        <main>
            <PDFViewer style={tw("h-[80vh] w-full")}>
                <Document pageLayout="twoColumnRight">
                    <Page
                        size="A4"
                        style={tw("p-4 flex flex-row flex-wrap gap-4")}
                    >
                        {[...Array(3)].map((_, i) => (
                            <View
                                key={i}
                                style={tw("w-full p-4 flex-col bg-cyan-200")}
                                wrap={false}
                            >
                                <Text style={tw("text-2xl font-bold")}>
                                    Section {i + 1}
                                </Text>
                                <View
                                    style={tw(
                                        "flex flex-row flex-wrap gap-2 w-full"
                                    )}
                                >
                                    <View style={tw("flex-1 bg-indigo-100")}>
                                        <Text style={tw("text-sm")}>
                                            {data}
                                        </Text>
                                    </View>
                                    <View style={tw("flex-1 bg-red-100")}>
                                        <Text style={tw("text-sm")}>
                                            {data}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </Page>
                </Document>
            </PDFViewer>
        </main>
    );
});

export default TestPdf;
