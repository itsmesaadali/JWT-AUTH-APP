'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}