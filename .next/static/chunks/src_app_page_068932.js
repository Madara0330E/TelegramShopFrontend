(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_page_068932.js", {

"[project]/src/app/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
function Home() {
    _s();
    const [validationMessage, setValidationMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Проверка...");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const checkTelegramWebApp = {
                    "Home.useEffect.checkTelegramWebApp": ()=>{
                        if (window.Telegram && window.Telegram.WebApp) {
                            console.log("Telegram WebApp найден");
                            const webApp = window.Telegram.WebApp;
                            webApp.ready();
                            console.log("WebApp is ready");
                            const initData = webApp.initData;
                            console.log("Init Data:", initData);
                            if (!initData || initData.length === 0) {
                                console.error("Ошибка: Нет данных initData от Telegram.");
                                setValidationMessage("Ошибка: нет данных от Telegram!");
                                return;
                            }
                            setIsLoading(true);
                            setValidationMessage("Проверка...");
                            fetch("https://shop.chasman.engineer/api/v1/auth/validate-init", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "accept": "*/*"
                                },
                                body: JSON.stringify({
                                    initData
                                })
                            }).then({
                                "Home.useEffect.checkTelegramWebApp": (response)=>response.json()
                            }["Home.useEffect.checkTelegramWebApp"]).then({
                                "Home.useEffect.checkTelegramWebApp": (data)=>{
                                    console.log("Validation Response:", data);
                                    if (data.authToken) {
                                        setValidationMessage("✅ Валидация успешна! Токен получен.");
                                    } else {
                                        setValidationMessage(`❌ Ошибка: ${data.error || "Неизвестная ошибка"}`);
                                    }
                                }
                            }["Home.useEffect.checkTelegramWebApp"]).catch({
                                "Home.useEffect.checkTelegramWebApp": (error)=>{
                                    console.error("Ошибка при отправке данных на сервер:", error);
                                    setValidationMessage("Ошибка при проверке пользователя.");
                                }
                            }["Home.useEffect.checkTelegramWebApp"]).finally({
                                "Home.useEffect.checkTelegramWebApp": ()=>{
                                    setIsLoading(false);
                                }
                            }["Home.useEffect.checkTelegramWebApp"]);
                        } else {
                            console.error("Ошибка: Telegram WebApp недоступен!");
                            setValidationMessage("Ошибка: Telegram WebApp недоступен!");
                        }
                    }
                }["Home.useEffect.checkTelegramWebApp"];
                if (window.Telegram && window.Telegram.WebApp) {
                    checkTelegramWebApp();
                } else {
                    const script = document.createElement("script");
                    script.src = "https://telegram.org/js/telegram-web-app.js";
                    script.async = true;
                    script.onload = checkTelegramWebApp;
                    document.body.appendChild(script);
                }
            }
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-screen bg-gray-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-gray-800",
                children: "Welcome to Telegram Mini App"
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-gray-600",
                children: "This is a mini app built with React, Next.js, and Tailwind CSS."
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-blue-600",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 76,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-4 bg-white shadow-md rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: validationMessage.startsWith("✅") ? "text-green-600" : "text-red-600",
                    children: validationMessage
                }, void 0, false, {
                    fileName: "[project]/src/app/page.js",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(Home, "cL0pw6Bp/qYdO1UXC1NDxxwhu0A=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_page_068932.js.map