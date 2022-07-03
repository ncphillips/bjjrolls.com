export const theme = {
  colors: {
    gray: {
      10: "hsl(0, 0%, 99%)",
      30: "hsl(0, 0%, 97%)",
      50: "hsl(0, 0%, 95%)",
      100: "hsl(240, 2%, 90%)",
      200: "hsl(240, 3%, 80%)",
      300: "hsl(240, 3%, 70%)",
      400: "hsl(240, 3%, 57%)",
      600: "hsl(240, 2%, 40%)",
      700: "hsl(240, 2%, 30%)",
      800: "hsl(240, 2%, 24%)",
      get border() {
        return theme.colors.gray[200]
      },
    }
  }
}