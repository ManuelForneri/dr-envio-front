"use client";

import { IconButton, Skeleton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type ColorMode = "light" | "dark";

const ColorModeContext = React.createContext<{
  colorMode: ColorMode;
  toggleColorMode: () => void;
} | null>(null);

export function ColorModeProvider({ children, ...props }: ThemeProviderProps) {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = (forcedTheme || resolvedTheme || "light") as ColorMode;

  const toggleColorMode = React.useCallback(() => {
    setTheme(colorMode === "dark" ? "light" : "dark");
  }, [colorMode, setTheme]);

  const value = React.useMemo(
    () => ({
      colorMode,
      toggleColorMode,
    }),
    [colorMode, toggleColorMode]
  );

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props}>
      <ColorModeContext.Provider value={value}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export function useColorMode() {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}
function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}
export const ColorModeButton = React.forwardRef<HTMLButtonElement, any>(
  (props, ref) => {
    const { toggleColorMode } = useColorMode();

    return (
      <IconButton
        ref={ref}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        style={{ height: "1.5rem" }}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    );
  }
);

ColorModeButton.displayName = "ColorModeButton";

export function LightMode({ children }: { children: React.ReactNode }) {
  return (
    <Span className="chakra-theme light" display="contents" data-theme="light">
      {children}
    </Span>
  );
}

export function DarkMode({ children }: { children: React.ReactNode }) {
  return (
    <Span className="chakra-theme dark" display="contents" data-theme="dark">
      {children}
    </Span>
  );
}
