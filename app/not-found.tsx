import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="center mx-auto flex-col  h-[100dvh] bg-gradient-to-r  text-white text-center">
      <h1 className="text-6xl font-extrabold mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-bold mb-2">Oops! You broke the internet!</h2>
      <p className="text-lg mb-8">
        But do not worry, we have sent a team of highly trained hamsters to fix
        it.
      </p>
      <img
        src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif"
        alt="Funny hamster gif"
        className="w-64 h-64 mb-8 rounded-full shadow-lg border-4 border-white"
      />
      <a
        href="/"
        className="text-lg font-semibold underline hover:text-yellow-200"
      >
        Take me home, country roads!
      </a>
    </div>
  );
};

export default ErrorPage;
