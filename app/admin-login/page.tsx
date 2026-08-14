"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const adminUsername =
      process.env.NEXT_PUBLIC_DEMO_ADMIN_USERNAME;

    const adminPassword =
      process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD;

    if (
      username === adminUsername &&
      password === adminPassword
    ) {
      sessionStorage.setItem(
        "fashion_admin",
        "true"
      );

      router.push("/admin");
    } else {
      alert(
        "Invalid username or password."
      );
    }
  }

  return (
    <main className="admin-login-page">

      <div className="admin-login-box">

        <h1>
          FASHION STORE
        </h1>

        <p>
          Admin Dashboard Login
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </main>
  );
}