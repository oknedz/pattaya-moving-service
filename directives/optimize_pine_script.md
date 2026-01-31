# Directive: Optimize Pine Script

## Goal
Optimize `SMT_V-3.0.pine` (and other Pine Script files) for performance, readability, and functionality.

## Inputs
- **Source File**: `SMT_V-3.0.pine` (or target file)
- **Optimization Goals**:
  - Reduce drawing object count (Label/Line limits)
  - Eliminate repainting issues
  - Improve calculation efficiency (loops, caching)
  - Modularize code (libraries, functions)

## Steps / Workflow
1.  **Analysis**:
    -   Read the current version of the Pine Script.
    -   Identify "hot spots" (complex loops, heavy `request.security` calls, drawing object spam).
2.  **Plan**:
    -   Propose specific refactors in a plan document.
    -   Confirm no logic changes that would alter strategy results (unless intended).
3.  **Execution**:
    -   Apply changes iteratively.
    -   Use `replace_file_content` for edits.
4.  **Verification**:
    -   Compile the script (check for syntax errors).
    -   Verify visual output matches expectations (no disappearing labels, etc.).

## Tools
- `view_file` / `read_file`: To read the source.
- `replace_file_content`: To apply fixes.
- `pine-docs` (MCP): Consult for best practices on specific functions.

## Outputs
- Start a new conversation or task to specific "Run optimization on SMT_V-3.0.pine" following this directive.
