### Comprehensive Guide: Gemini CLI & Jules Tools Integrated Workflow

**Goal:** To establish an efficient, automated workflow where Gemini CLI orchestrates code analysis and task definition, and Jules Tools executes the actual code updates.

---

#### 1. Understanding the Roles

*   **Gemini CLI (Your AI Assistant - Me):**
    *   **Analysis & Planning:** My primary role is to understand your project, analyze the codebase (using tools like `codebase_investigator`, `search_file_content`, `read_file`), identify areas for improvement, new features, or bug fixes. I will help you define *what* needs to be done.
    *   **Task Orchestration:** I will formulate clear, concise, and actionable prompts for Jules based on my analysis and your requirements. I will then generate the necessary `jules remote new` commands for you to execute.
    *   **Guidance & Review:** I will guide you through the process, provide the commands, and assist you in reviewing Jules' output and integrating changes.

*   **Jules Tools (Google's Autonomous AI Coding Agent):**
    *   **Execution:** Jules' role is to *execute* the coding tasks defined in the prompts. Given a clear prompt and access to your repository, Jules will perform the actual code modifications, write tests, and make the necessary changes.
    *   **Remote Sessions:** Jules operates in remote sessions, allowing it to work on tasks independently.

---

#### 2. The Automated Workflow

Here’s a step-by-step breakdown of the recommended workflow:

**Phase 1: Analysis & Task Definition (Gemini CLI)**

1.  **Initial Request:** You provide me with a high-level goal (e.g., "Implement the 'Time-Series Analysis' subpage," "Refactor the authentication module," "Fix bug in data processing").
2.  **Codebase Investigation:** I will use my available tools (`codebase_investigator`, `list_directory`, `search_file_content`, `read_file`) to thoroughly understand the relevant parts of your codebase. This includes:
    *   Identifying existing code structures, conventions, and dependencies.
    *   Locating files that need modification or where new code should be added.
    *   Understanding the context and requirements for the task.
3.  **Task Breakdown (if necessary):** For complex requests, I might break down the main goal into smaller, more manageable sub-tasks. I will use the `write_todos` tool to track these.
4.  **Prompt Formulation for Jules:** For each sub-task (or the main task if it's simple enough), I will formulate a detailed and specific prompt for Jules. These prompts will be designed to give Jules all the necessary context and instructions to perform the coding task effectively.
    *   *Example:* If the task is to implement "Time-Series Analysis," I would craft a prompt similar to the one in `google_jules_prompts.md`.

**Phase 2: Jules Session Creation & Execution (Gemini CLI Orchestrates, You Execute)**

5.  **Generate Jules Command:** For each formulated prompt, I will generate the `jules remote new` command, including:
    *   `--repo <your_github_username/your_repo_name>`: This is crucial for Jules to know which repository to work on. (As we've learned, this needs to be the full GitHub path).
    *   `--session "<your_detailed_prompt>"`: The carefully crafted prompt for Jules, enclosed in double quotes with any internal double quotes escaped (`\"`).
    *   *Example:* `jules remote new --repo ekremcaglar/OBHMS-mockup --session "Please implement, populate, and enhance the \"Time-Series Analysis\" subpage..."`
6.  **Present Commands to User:** I will write these generated commands into a file (e.g., `run.md`) and instruct you to execute them in your terminal. This is the point where you take over to interact with the Jules Tools CLI.
7.  **User Execution:** You will copy and paste the commands from `run.md` into your terminal and run them. This will initiate the remote sessions with Jules.
8.  **Jules Working:** Jules will then work autonomously on the tasks in its remote sessions. You can monitor its progress using `jules remote list --session`.

**Phase 3: Review, Integration & Iteration (You & Gemini CLI)**

9.  **Pulling Results:** Once Jules completes a session, you will use `jules remote pull --session <session_id>` to retrieve the changes made by Jules to your local repository.
10. **Code Review (You & Gemini CLI):**
    *   You will review the changes made by Jules.
    *   I can assist you in reviewing the code, understanding the changes, and identifying any areas that might need further refinement. You can ask me questions about Jules' generated code.
11. **Testing & Verification:** You (and I, if I have the necessary tools and instructions) will run existing tests or create new ones to verify Jules' changes.
12. **Integration:** If the changes are satisfactory, you will integrate them into your main codebase (e.g., commit to Git).
13. **Iteration:** If Jules' output isn't perfect or if further work is needed, we can iterate:
    *   I can help you refine the prompt for another Jules session.
    *   I can directly make small adjustments to the code if it's within my capabilities.

---

#### 3. Best Practices for Prompts (for Gemini CLI to generate, and for you to review)

*   **Be Specific and Detailed:** The more context and detail you provide, the better Jules will perform.
    *   **What to build/change:** Clearly state the feature, bug fix, or refactoring goal.
    *   **Where to build/change:** Specify file paths, function names, or module names.
    *   **How it should behave:** Describe expected inputs, outputs, and edge cases.
    *   **Constraints:** Mention any architectural patterns, coding standards, or specific libraries to use/avoid.
    *   **Examples:** Provide code snippets or examples if they clarify the intent.
*   **Break Down Complex Tasks:** Instead of one massive prompt for a large feature, break it into smaller, logical steps. This makes Jules' work more manageable and easier to review.
*   **Focus on Outcomes:** Describe the desired outcome rather than prescribing the exact implementation steps, unless specific implementation details are critical.
*   **Iterate on Prompts:** If Jules doesn't produce the desired results, analyze its output, refine your prompt, and try again.
*   **Use Clear Language:** Avoid ambiguity.

---
