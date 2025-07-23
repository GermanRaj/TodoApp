import {expect, test} from "@playwright/test";
import {TodoPage} from "./pages/todo-page";


test('Create a  task', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await page.goto('https://todo-app.tallinn-learning.ee/#/');
    await todoPage.input.fill('test');
    await todoPage.input.press('Enter');
    await expect.soft(todoPage.toDoText).toHaveText('test')
})

test('delete created task', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    const todosPage = new TodoPage(page);
    await todosPage.input.fill('New Task');
    await todosPage.input.press('Enter');
    await todosPage.input.fill('NewTask 1');
    await todosPage.input.press('Enter');
    const taskItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'New Task' });
    await taskItem.hover();
    const deleteButton = taskItem.locator('[data-testid="todo-item-button"]');
    await deleteButton.click();
    expect.soft(await todosPage.countTodoItems(page)).toBe(1);
});

test('Activate task by name with completed button ', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    const todosPage = new TodoPage(page);
    await todosPage.input.fill('task 1');
    await todosPage.input.press('Enter');
    await todosPage.input.fill('task 2');
    await todosPage.input.press('Enter');
    const firstTask = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 1'});
    const firstTaskPush = firstTask.locator('[data-testid="todo-item-toggle"]');
    await firstTaskPush.click();
    await expect.soft(firstTask).toHaveClass(/completed/);
    const secondTask = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 2 '});
    await expect.soft(secondTask).not.toHaveClass(/completed/);
})

test('Buttons Active and Completed check ', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    const todosPage = new TodoPage(page);
    await todosPage.input.fill('task 1');
    await todosPage.input.press('Enter');
    await todosPage.input.fill('task 2');
    await todosPage.input.press('Enter');
    await todosPage.input.fill('task 3');
    await todosPage.input.press('Enter');
    const firstTask = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 1'});
    const firstTaskDone = firstTask.locator('[data-testid="todo-item-toggle"]');
    await firstTaskDone.click();
    const secondTask = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 2 '});
    const secondTaskDone = secondTask.locator('[data-testid="todo-item-toggle"]');
    const thirdTask = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 3 '});
    await secondTaskDone.click();
    await todosPage.buttonCompleted.click();
    await expect.soft(firstTask).toBeVisible();
    await expect.soft(secondTask).toBeVisible()
    await todosPage.buttonActive.click();
    await expect.soft(thirdTask).toBeVisible()
})

test('Check toggle all feature ', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    const todosPage = new TodoPage(page);
    await todosPage.input.fill('task 1');
    await todosPage.input.press('Enter');
    await todosPage.input.fill('task 2');
    await todosPage.input.press('Enter');
    await todosPage.buttonToggleAll.click();
    const firstItem = page.locator('[data-testid="todo-item"]').filter({hasText: 'task 1'});
    await expect.soft(firstItem).toHaveClass(/completed/);
    const secondItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'task 2' });
    await expect.soft(secondItem).toHaveClass(/completed/);


})





