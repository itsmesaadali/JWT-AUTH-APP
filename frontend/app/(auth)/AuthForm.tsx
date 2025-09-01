"use client";

import { useActionState } from "react";

const inputStyle = "px-2 py-1 bg-gray-100 rounded-lg";

type props = {
  isSingup: boolean;
  action: (f: FormData) => Promise<void>;
};

const AuthForm = ({ isSingup, action }: props) => {
    // @ts-ignore
    const [state, formAction] = useActionState(action, undefined )
  return (
    <section className="w-full h-screen flex flex-col">
      <form
        action={formAction}
        className="flex flex-col m-auto justify-center items-center border-4 rounded-lg p-4 gap-2"
      >
        {JSON.stringify(state)}
        <h4 className="text-4xl py-3">{isSingup ? 'Register ' : 'Login'} From here!</h4>
        {isSingup && (
          <>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className={inputStyle} />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className={inputStyle} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={inputStyle}
        />

        <button className="bg-slate-300 rounded-lg px-4 py-1 hover:bg-slate-200">
          {isSingup ? 'Signup' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
