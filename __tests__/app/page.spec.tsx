import React from "react";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/navigation/navbar", () => {
  const NavbarMock = () => <div data-testid="navbar-mock"></div>;
  NavbarMock.displayName = "NavbarMock";
  return NavbarMock;
});

describe("Home Component", () => {
  it("renders the Home component and includes the Navbar", () => {
    render(<Home />);

    const navbarElement = screen.getByTestId("navbar-mock");
    expect(navbarElement).toBeInTheDocument();

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass(
      "flex",
      "h-full",
      "flex-col",
      "justify-between",
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
      "from-orange-200",
      "to-orange-800"
    );
  });
});
