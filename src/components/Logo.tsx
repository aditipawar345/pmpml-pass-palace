
export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-10 w-10 items-center justify-center bg-pmpml-red rounded-full">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-5 w-5"
        >
          <path d="M8 4h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M4 16V9c0-1.1.9-2 2-2" />
          <path d="M9 20h7a2 2 0 0 0 2-2v-4" />
          <path d="M12 12v2" />
          <path d="M12 8v1" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold">PMPML</h1>
        <p className="text-xs text-gray-500">Pune Metro Bus</p>
      </div>
    </div>
  );
}
