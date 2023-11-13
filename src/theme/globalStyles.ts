interface Styles {
  screen: React.CSSProperties;
  container: React.CSSProperties;
}

const globalStyles: Styles = {
    screen: {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    zIndex: 3,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default globalStyles;
