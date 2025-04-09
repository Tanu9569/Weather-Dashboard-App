import React from "react";
import { Button } from "./Button";

export const Footer = () => {
  return (
    <footer className="flex flex-row justify-center items-center gap-4 bg-[#121212] text-[#FFDB70] py-4">
      <p className="text-sm">Made by Tanu Sharma</p>
      <Button>
        <a href="https://github.com/Tanu9569/Weather-Dashboard-App" target="_blank" rel="noopener noreferrer">
            GitHub
        </a>
      </Button>
    </footer>
  );
};
