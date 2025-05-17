import { ChakraProvider, Flex, Box, Link, VStack } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"; // これを追加

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import StationList from "./pages/StationList";
import TimetableEditor from "./pages/TimetableEditor";
import DiagramView from "./pages/DiagramView";

export default function App() {
  return (
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Flex h="100vh">
            {/* サイドバー */}
            <Box
                w="200px"
                bg="gray.50"
                borderRight="1px"
                borderColor="gray.200"
                p="4"
            >
              <VStack align="start" >
                <Link as={NavLink} href="/stations">
                  駅一覧
                </Link>
                <Link as={NavLink} href="/editor">
                  時刻表編集
                </Link>
                <Link as={NavLink} href="/diagram">
                  ダイヤグラム
                </Link>
              </VStack>
            </Box>

            {/* コンテンツ */}
            <Box flex="1" p="4">
              <Routes>
                <Route path="/stations" element={<StationList />} />
                <Route path="/editor"   element={<TimetableEditor />} />
                <Route path="/diagram"  element={<DiagramView />} />
              </Routes>
            </Box>
          </Flex>
        </BrowserRouter>
      </ChakraProvider>
  );
}