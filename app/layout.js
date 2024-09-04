export const metadata = {
  title: "FriendWatch Configurator",
  description: "Generates configuration files for SwitchFriendWatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
