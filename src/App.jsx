import { Box, Button, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("#f0f0f0", "#0f0a19")}
      color={useColorModeValue("gray.800", "gray.500")}
      px={6}
      py={8}
    >
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="2xl" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          Sasta VS Code Editor
        </Heading>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
      <CodeEditor />
    </Box>
  );
}

export default App;