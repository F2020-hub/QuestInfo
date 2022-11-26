import { Box, useStyleConfig, useColorModeValue } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box
      __css={styles}
      {...rest}
      bg={useColorModeValue("#fff", "#363f50")}
      color={useColorModeValue("gray.800", "#fff")}
    >
      {children}
    </Box>
  );
}

export default Card;
