import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  rowContainer: {
    backgroundColor: "transparent",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  selectedRow: {
    backgroundColor: "#CCCCCC",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  paginationButtonText: {
    color: "#fff",
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#DC3545",
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  UserDetailsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  actionIcons: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    columnGap: 10,
    alignItems: 'center'
  }
});

export default styles;
