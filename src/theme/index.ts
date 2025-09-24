import { theme as baseTheme } from "@chakra-ui/theme";

const customTheme = {
  ...baseTheme,
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: (props: any) => ({
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.600",
          },
        }),
      },
    },
  },
};

export default customTheme;
