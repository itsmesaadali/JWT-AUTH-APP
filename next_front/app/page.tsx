import Link from "next/link";

export default function Home() {
  return (
    <div>
      Auth APP
      <Link href={'/login'}> Login</Link>
      <Link href={'/signup'}> SignUp</Link>
    </div>
  );
}