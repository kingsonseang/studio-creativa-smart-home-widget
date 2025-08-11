import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-svh items-center justify-center">
      <div className="px-4">
        <h2 className="font-bold text-xl">Todo</h2>
        <ol className="list-inside list-decimal text-lg">
          <li>
            <Link href="/energy-consumption">Energy Consumption</Link>
          </li>
          <li className="line-through opacity-80">Air Conditioning</li>
          <li className="line-through opacity-80">Home Appliances</li>
        </ol>
      </div>
    </div>
  );
}
