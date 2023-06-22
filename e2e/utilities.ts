/** @format */

import { expect, Page } from "@playwright/test";
export class Utilities {
  constructor(public page: Page) {}

  static inputTodo = ".new-todo";
  static todoLastItem = ".todo-list li:last-child label";
  static editTodoLastItem = ".todo-list li:last-child .edit";
  static deleteTodoItemButton = ".todo-list li:last-child button";
  static footerFilter = ".filters";
  static footerCompleteButton = '[href="#/completed"]';
  static footerActiveButton = '[href="#/active"]';
  static clearCompleteButton = ".clear-completed";
  static footerAllButton = '[href="#/"]';
  static todoToggleButton = ".todo-list li:last-child .toggle";

  locateTodoLastItem = this.page.locator(Utilities.todoLastItem);

  async addTodoItem(todoItem: string) {
    await this.page.fill(Utilities.inputTodo, todoItem);
    await this.page.press(Utilities.inputTodo, "Enter");
    await expect(this.locateTodoLastItem).toHaveText(todoItem);
  }
  async editTodoItem(editTodoItem: string) {
    await this.locateTodoLastItem.dblclick();
    await this.page.fill(Utilities.editTodoLastItem, editTodoItem);
    await this.page.press(Utilities.editTodoLastItem, "Enter");
    await expect(this.locateTodoLastItem).toHaveText(editTodoItem);
  }
  async deleteTodoItem() {
    await this.locateTodoLastItem.hover();
    await expect(
      this.page.locator(Utilities.deleteTodoItemButton)
    ).toBeVisible();
    await this.page.click(Utilities.deleteTodoItemButton);
    await expect(this.locateTodoLastItem).not.toBeVisible();
  }

  async markTodoItemAsCompleted(todo: string) {
    await this.addTodoItem(todo);
    await expect(this.page.locator(Utilities.footerFilter)).toBeVisible();
    await this.page.click(Utilities.todoToggleButton);

    const completeTodo: any = await this.page.$(".todo-list li:last-child");
    const isComplete = await completeTodo.getAttribute("class");
    expect(isComplete).toContain("completed");

    await expect(this.locateTodoLastItem).toHaveText(todo);

    await this.page.click(Utilities.footerCompleteButton);
    await expect(this.locateTodoLastItem).toHaveText(todo);
  }
  async viewActiveTodoItem(activeTodoItem: string) {
    await this.page.fill(Utilities.inputTodo, activeTodoItem);
    await this.page.press(Utilities.inputTodo, "Enter");
    await expect(this.page.locator(Utilities.footerFilter)).toBeVisible();

    await this.page.click(Utilities.footerActiveButton);
    await expect(this.locateTodoLastItem).toHaveText(activeTodoItem);
  }

  async clearCompleteTodoItem(todo: string) {
    await expect(this.page.locator(Utilities.footerFilter)).toBeVisible();

    await this.page.click(Utilities.footerCompleteButton);
    await expect(this.locateTodoLastItem).toHaveText(todo);

    await expect(
      this.page.locator(Utilities.clearCompleteButton)
    ).toBeVisible();
    await this.page.click(Utilities.clearCompleteButton);
    await expect(this.locateTodoLastItem).not.toBeVisible();

    await this.page.click(Utilities.footerAllButton);

    await expect(this.locateTodoLastItem).not.toHaveText(todo);
  }
}
