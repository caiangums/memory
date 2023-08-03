import { render, screen } from "@testing-library/react";
import MemoryPage from "./page";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  it("renders a Memory Page", () => {
    render(<MemoryPage />);

    expect(screen.getByText("Memory Game")).toBeInTheDocument();
    expect(screen.getByLabelText("Memory Board")).toBeInTheDocument();
  });
});
