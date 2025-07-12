import React from "react";

export default function pagenotfound() {
  return (
    <div>
      404 Page Not Found
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the homepage.</p>
      <a href="/" className="text-blue-500 underline">
        Go to Homepage
      </a>
    </div>
  );
}
