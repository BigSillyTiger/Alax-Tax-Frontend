import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

const LoginPage: FC = () => {
    const navigation = useNavigation();
    const loaderData = useLoaderData();
    const { t } = useTranslation();
    const data = useActionData() as { actionErr: boolean } | null;

    const LoginErrorAlert = () => {
        return (
            <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <XCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            {t("login.text.errLoginTitle")}
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            <ul
                                role="list"
                                className="list-disc pl-5 space-y-1"
                            >
                                <li>{t("login.text.checkEmail")}</li>
                                <li>{t("login.text.checkPW")}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {t("login.text.signIn")}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Form
                        className="space-y-6"
                        action={
                            loaderData
                                ? `/login?redirect=${loaderData}`
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

                        <div className="flex items-center justify-between">
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                disabled={
                                    navigation.state === "submitting" ||
                                    navigation.state === "loading"
                                }
                            >
                                {navigation.state === "submitting"
                                    ? t("login.btn.logining")
                                    : t("login.btn.signIn")}
                            </button>
                        </div>
                    </Form>
                </div>
                {data && data.actionErr && <LoginErrorAlert />}
            </div>
        </div>
    );
};

//export default connect(null, null)(LoginPage);
export default LoginPage;
