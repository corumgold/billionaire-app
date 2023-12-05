import appColors from "./colors";

interface Styles {
  screen: React.CSSProperties;
  container: React.CSSProperties;
  backButton: React.CSSProperties;
  list: React.CSSProperties;
  listItem: React.CSSProperties;
  spanAccent: React.CSSProperties;
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
  backButton: {
    position: "fixed",
    top: 0,
    left: 0,
    margin: "1rem",
  },
  list: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    maxWidth: "100vw",
    marginTop: "20px",
    minHeight: "250px",
    minWidth: "100%",
  },
  listItem: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: "225px",
    margin: "0 8px",
  },
  spanAccent: {
    color: appColors.accent,
  }
};

export default globalStyles;
