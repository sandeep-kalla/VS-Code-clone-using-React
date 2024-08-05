/* eslint-disable react/prop-types */
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants.js";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize='lg'>Language: </Text>
      <Menu isLazy>
        <MenuButton as={Button} colorScheme="teal">
          {language}
        </MenuButton>
        <MenuList bg={useColorModeValue("#f0f0f0", "#110c1b")}>
          {
            languages.map(([lang, version]) => (
              <MenuItem key={lang} 
                color={lang === language ? ACTIVE_COLOR : ""}
                bg={lang === language ? "grey.900" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "grey.900",
                }}
                onClick={() => onSelect(lang)}>
                {lang}
                &nbsp;
                <Text as='span' color='grey.600' fontSize='sm'>({version})</Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;