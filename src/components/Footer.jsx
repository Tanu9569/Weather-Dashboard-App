import React from "react";
import { Button } from "./Button";

export const Footer = () => {
  return (
    <footer className="flex flex-row justify-center items-center gap-4 bg-[#121212] text-[#FFDB70] py-4">
      <p className="text-sm">Made with ❤️ by Sangeetha Choudhary</p>
      <Button>
        <a href="https://github.com/3Sangeetha3/Zynetic" target="_blank" rel="noopener noreferrer">
            GitHub
        </a>
      </Button>
    </footer>
  );
};
