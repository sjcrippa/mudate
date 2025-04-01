// import { login, signup } from "./actions";

// export default function LoginPage() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <form className="flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4">
//         <label htmlFor="email">Email:</label>
//         <input id="email" name="email" type="email" required />
//         <label htmlFor="password">Password:</label>
//         <input id="password" name="password" type="password" required />
//         <button formAction={login}>Log in</button>
//         <button formAction={signup}>Sign up</button>
//       </form>
//     </div>
//   );
// }

import { LoginForm } from "./components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
