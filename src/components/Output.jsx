/* eslint-disable react/prop-types */
import { Box, Button, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      setOutput(result.run.output.split("\n"));
      setIsError(!!result.run.stderr);
      toast({
        title: "Code executed successfully",
        description: "Your code has been executed successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An Error occurred",
        description: error.message || "Unable to Run Code",
        status: "error",
        duration: 3000,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%" p={4} bg={useColorModeValue("#f0f0f0", "#1e1e1e")} borderRadius="md" boxShadow="lg">
      <Text mb={2} fontSize="lg">Output</Text>
      <Button
        isLoading={isLoading}
        onClick={runCode}
        variant="solid"
        colorScheme="teal"
        mb={4}
        _hover={{ bg: "teal.600" }}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : useColorModeValue("gray.800", "white")}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : useColorModeValue("gray.300", "#333")}
        display="flex"
        flexDirection="column"
        overflowY="auto"
        bg={useColorModeValue("#f0f0f0", "#2c2c2c")}
      >
        {output.length > 0 ? 
          output.map((line, index) => (
            <Text key={index} whiteSpace="pre-wrap">{line}</Text>
          ))
        : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;