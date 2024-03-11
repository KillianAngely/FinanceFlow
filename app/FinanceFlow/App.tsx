import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useWallet } from "./hooks/useWallet";
import { useState } from "react";

export default function App() {
  const { wallet, create } = useWallet();
  const [walletName, setWalletName] = useState("");
  const [walletLimit, setWalletLimit] = useState("");

  const handleCreateWallet = () => {
    create(walletName, parseInt(walletLimit));
  };

  console.log(wallet);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="name Wallet"
        value={walletName}
        onChangeText={setWalletName}
      />
      <TextInput
        style={styles.input}
        placeholder="limit Wallet"
        value={walletLimit}
        onChangeText={setWalletLimit}
      />
      <Button title="Press me" onPress={handleCreateWallet} />
      <Text>my Wallet {}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
