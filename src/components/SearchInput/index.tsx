"use client"

import type React from "react"
import SearchIcon from "../icons/Search"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
  className?: string
}

export default function SearchInput({
  placeholder = 'Search...',
  onSearch,
  className,
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className='relative w-full max-w-md'>
      <input
        type='text'
        placeholder={placeholder}
        onChange={handleChange}
        className={`h-12 rounded-full border-2 border-foreground pl-6 pr-14 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 ${className}`}
      />
      <SearchIcon className='absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground' />
    </div>
  );
}
