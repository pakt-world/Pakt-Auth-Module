/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { setGlobalErrorHandler } from "../lib/error-handler";
import { applyTheme } from "../utils";
import defaultTheme from "../styles/default-theme";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/index.scss";
import { ConfigContextType } from "../types";

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig must be used within a ConfigProvider");
    }
    return context;
};

interface ConfigProviderProps {
    config: ConfigContextType;
    children: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({
    config,
    children,
}) => {
    useEffect(() => {
        if (config?.errorHandler) {
            setGlobalErrorHandler(config.errorHandler);
        }

        applyTheme({ ...defaultTheme, ...(config?.theme || {}) });
    }, [config]);

    return (
        <ConfigContext.Provider value={config}>
            {children}
            <Toaster
                position="top-right"
                gutter={8}
                containerClassName="!pam-z-[999999]"
            />
        </ConfigContext.Provider>
    );
};

export { 
    useConfig,
    ConfigProvider,
};
