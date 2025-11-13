import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar.jsx";

vi.mock("../utils/index.js", () => ({
  debounce: (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },
}));

describe("SearchBar Component", () => {
  let mockOnChange;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  it("renders with correct placeholder text", () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    expect(
      screen.getByPlaceholderText("Search repositories...")
    ).toBeInTheDocument();
  });

  it("displays the current value in the input", () => {
    render(<SearchBar value="react" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue("react");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when user types in the input", async () => {
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search repositories...");
    fireEvent.change(input, { target: { value: "javascript" } });

    // Wait for debounce delay (500ms)
    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalledWith("javascript");
      },
      { timeout: 1000 }
    );
  });

  it("shows clear button when input has value", () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  it("renders with custom placeholder when provided", () => {
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        placeholder="Custom placeholder"
      />
    );

    expect(
      screen.getByPlaceholderText("Custom placeholder")
    ).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(
      <SearchBar value="" onChange={mockOnChange} className="custom-class" />
    );

    const container = screen
      .getByPlaceholderText("Search repositories...")
      .closest("div");
    expect(container).toHaveClass("custom-class");
  });
});

describe("SearchBar Debouncing", () => {
  it("debounces multiple rapid changes", async () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search repositories...");

    fireEvent.change(input, { target: { value: "r" } });
    fireEvent.change(input, { target: { value: "re" } });
    fireEvent.change(input, { target: { value: "rea" } });
    fireEvent.change(input, { target: { value: "reac" } });
    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith("react");
      },
      { timeout: 1000 }
    );
  });
});

describe("SearchBar Accessibility", () => {
  it("has proper aria-label for search input", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    const input = screen.getByLabelText("Search repositories");
    expect(input).toBeInTheDocument();
  });

  it("has proper aria-label for clear button", () => {
    render(<SearchBar value="test" onChange={vi.fn()} />);

    const clearButton = screen.getByLabelText("Clear search");
    expect(clearButton).toBeInTheDocument();
  });
});
