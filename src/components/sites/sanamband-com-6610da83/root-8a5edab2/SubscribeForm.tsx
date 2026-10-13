"use client";

import { ArrowRight } from "../shared/icons";

export interface SubscribeFormProps {
  idSuffix: string;
}

export function SubscribeForm({ idSuffix }: SubscribeFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="relative group">
          <input
            id={`email-address-${idSuffix}`}
            name="email"
            type="email"
            required
            placeholder=" "
            className="peer block w-full rounded-lg bg-neutral-100 border-transparent py-3 px-4 text-neutral-900 placeholder-transparent focus:border-black focus:ring-0 transition-all duration-300"
          />
          <label
            htmlFor={`email-address-${idSuffix}`}
            className="absolute left-3 top-3 text-sm text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-focus:bg-white bg-transparent px-1"
          >
            Email Address
          </label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-sm font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-all duration-300"
        >
          Don&apos;t miss a beat
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-4 text-xs text-neutral-400 text-center">
        By subscribing, you agree to receive marketing emails from SANAM. You
        can unsubscribe at any time.
      </p>
    </>
  );
}

export default SubscribeForm;