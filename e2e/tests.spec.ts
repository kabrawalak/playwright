/** @format */

import { test, Page } from "@playwright/test";
import { Utilities } from "./utilities";

let page: Page;
let utilities;

test.describe("Todo app functional testing", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    utilities = new Utilities(page);
    await page.goto("/examples/react/#");
  });

  test.afterAll(async ({ browser }) => {
    browser.close();
  });

  const todoItemToCreate = "TestTodo";
  const todoItemToBeUpdate = "UpdatedTodo";

  test("Validate create todo functionality ", async () => {
    await utilities.addTodoItem(todoItemToCreate);
  });

  test("Validate user can edit todo item in todoList", async () => {
    await utilities.editTodoItem(todoItemToBeUpdate);
  });

  test("Validate user can delete todo item from todoList", async () => {
    await utilities.deleteTodoItem();
  });

  test("Validate user can mark a todo item as completed", async () => {
    await utilities.markTodoItemAsCompleted(todoItemToCreate);
  });

  test("Validate user able to see only active todo item in active todo list", async () => {
    await utilities.viewActiveTodoItem("ActiveTestTodo");
  });

  test("Verify the completed todo is in complete list and then clear the todo list", async () => {
    await utilities.clearCompleteTodoItem(todoItemToCreate);
  });
});
