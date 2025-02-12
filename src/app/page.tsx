import Header from "../components/header";
import ActiveList from "@/components/active_list";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-8">
      <main className="flex flex-col items-center ">
        <Header />
        <ActiveList />
      </main>
      <footer className=""></footer>
    </div>
  );
}
