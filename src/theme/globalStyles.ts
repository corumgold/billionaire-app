interface Styles {
  screen: React.CSSProperties;
  container: React.CSSProperties;
  backButton: React.CSSProperties;
  list: React.CSSProperties;
  listItem: React.CSSProperties;
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
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    maxWidth: "100vw",
    marginTop: "20px",
    minHeight: "250px",
    minWidth: "100%",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: 200,
    margin: "0 8px",
  },
};

export default globalStyles;
