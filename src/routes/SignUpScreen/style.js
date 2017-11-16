import glamorous from "glamorous-native";

export const Container = glamorous.view({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red"
});

export const FormContainer = glamorous.view({
  width: 200
});

export const Text = glamorous.text({
  color: "white",
  fontSize: 24
});
