import { useTranslation } from "react-i18next";
import { XCircleIcon } from "@heroicons/react/24/solid";

const LoginErrorAlert = () => {
    const { t } = useTranslation();
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
                        <ul role="list" className="list-disc pl-5 space-y-1">
                            <li>{t("login.text.checkEmail")}</li>
                            <li>{t("login.text.checkPW")}</li>
                            <li>{t("login.text.contactManager")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginErrorAlert;
