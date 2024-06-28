import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import LoginCard from "@/pages/login/LoginCard";
import { StyledBtn1 } from "@/components/btns/StyledBtns";
import LoginErrorAlert from "./LoginErrorAlert";
//import DemoTips from "./DemoTips";

const Login: FC = () => {
    const navigation = useNavigation();
    const loaderData = useLoaderData() as { search: string; logo: string };
    const [imgSrc, setImgSrc] = useState<string>(loaderData.logo);
    const { t } = useTranslation();
    const data = useActionData() as { actionErr: boolean } | null;

    return (
        <div className="flex min-h-[100dvh] flex-row justify-center items-center gap-x-10 py-12 sm:px-6 lg:px-8">
            <div className="relative">
                {/* <Bganimation /> */}
                <div className="z-20">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-[20dvh] w-auto"
                            onError={() => {
                                console.log("---> logo not found");
                                setImgSrc("/logo.svg");
                            }}
                            src={imgSrc}
                            alt="CP Software logo"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            {t("login.text.signIn")}
                        </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        {/* <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> */}
                        <LoginCard>
                            <Form
                                className="space-y-6"
                                action={
                                    loaderData.search
                                        ? `/login?redirect=${loaderData.search}`
                                        : "/login"
                                }
                                method="POST"
                                replace
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {t("login.text.email")}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {t("login.text.pw")}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    {t("login.text.rememberMe")}
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    {t("login.text.forgotPW")}
                                </a>
                            </div>
                        </div> */}

                                <div>
                                    <StyledBtn1
                                        type="submit"
                                        className="w-full rounded-lg"
                                        disabled={
                                            navigation.state === "submitting" ||
                                            navigation.state === "loading"
                                        }
                                    >
                                        {navigation.state === "submitting"
                                            ? t("login.btn.logining")
                                            : t("login.btn.signIn")}
                                    </StyledBtn1>
                                </div>
                            </Form>
                        </LoginCard>
                        {/* </div> */}
                        {data && data.actionErr && <LoginErrorAlert />}
                    </div>
                </div>
            </div>
            {/* <DemoTips /> */}
        </div>
    );
};

export default Login;
