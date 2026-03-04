import { Stack } from "expo-router";

// defining a stack of screens
export default function RootLayout() {
  return (<Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name = "index"
        options = {{
          title: "home"
        }}
      />
      <Stack.Screen
        name = "detailPage"
        options = {{
          title: "details",
          headerBackButtonDisplayMode: 'minimal',
          headerShown: true
        }}
      />

    </Stack>
      
      
    );
}
