export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={"flex min-h-screen flex-col antialiased"}>
      <main className="container flex-1 p-6">{children}</main>
    </div>
  );
}
