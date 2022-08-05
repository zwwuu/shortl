import { Box } from "@mantine/core";

const ShortlActions = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "> *": { marginLeft: theme.spacing.xs, ":first-child": { marginLeft: 0 } },
      })}
    >
      {children}
    </Box>
  );
};

export default ShortlActions;
