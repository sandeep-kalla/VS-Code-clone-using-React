import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const handleWheel = (event) => {
        if (event.ctrlKey) {
          const delta = event.deltaY > 0 ? 0.9 : 1.1; // Zoom out or in
          const currentFontSize = editor.getOption(monaco.editor.EditorOption.fontSize);
          editor.updateOptions({
            fontSize: currentFontSize * delta,
          });
          event.preventDefault(); // Prevent default scroll behavior
        }
      };

      editor.onDidMount(() => {
        editor.addContentWidget({
          getId: () => 'zoom-controls',
          getDomNode: () => {
            const zoomControls = document.createElement('div');
            zoomControls.style.position = 'absolute';
            zoomControls.style.top = '10px';
            zoomControls.style.right = '10px';
            zoomControls.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            zoomControls.style.color = 'white';
            zoomControls.style.padding = '5px 10px';
            zoomControls.style.borderRadius = '4px';
            zoomControls.style.cursor = 'pointer';
            zoomControls.textContent = 'Zoom';
            zoomControls.addEventListener('click', () => {
              editor.updateOptions({
                fontSize: editor.getOption(monaco.editor.EditorOption.fontSize) * 1.1,
              });
            });
            return zoomControls;
          },
          getPosition: () => ({
            position: { column: 1, lineNumber: 1 },
            preference: [monaco.editor.ContentWidgetPositionPreference.TOP_RIGHT_CORNER],
          }),
        });
      });

      editor.onMouseWheel(handleWheel);
    }
  }, [editorRef]);

  return (
    <Box borderRadius="md" boxShadow="lg" overflow="hidden">
      <HStack spacing={4} align="stretch">
        <Box w="50%" p={4} bg={useColorModeValue("#f0f0f0", "#1e1e1e")} borderRadius="md">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor 
            height="75vh" 
            theme={useColorModeValue("light", "vs-dark")} 
            language={language}
            defaultValue={CODE_SNIPPETS[language]} 
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;