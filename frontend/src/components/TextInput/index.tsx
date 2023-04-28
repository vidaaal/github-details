import { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

export function TextInput({ prefix, ...rest }: TextInputProps) {
  return (
    <div className="w-full flex items-center rounded-md bg-gray-800 py-3 px-4">
      {!!prefix && <span className="text-gray-400">{prefix}</span>}

      <input
        className="bg-transparent w-full border-0 text-white outline-none placeholder:text-gray-500"
        type="text"
        {...rest}
      />
    </div>
  )
}
