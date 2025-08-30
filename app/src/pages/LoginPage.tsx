// import React from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="flex min-h-screen justify-between">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1723579268175-d27d90cd4772?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Learn"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
