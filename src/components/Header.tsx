import Link from "next/link";

export const Header = () => {
  return (
    <header className="my-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-xl">
      <Link href="/" className="font-mono">
        Codelynx<span className="text-primary">.dev</span>
      </Link>
      <div className="ml-auto"></div>
      <Link href="/" className="text-primary">
        Posts
      </Link>
    </header>
  );
};
