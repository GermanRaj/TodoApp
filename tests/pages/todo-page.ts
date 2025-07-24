import {Locator, Page} from "@playwright/test";
export class TodoPage {
    readonly page: Page
    readonly header: Locator
    readonly input: Locator
    readonly toDoText: Locator
    readonly buttonAll: Locator
    readonly buttonActive: Locator
    readonly buttonCompleted: Locator
    readonly buttonClearCompleted: Locator
    readonly buttonDelete: Locator
    readonly buttonToggleAll: Locator


    constructor(page: Page) {
        this.page = page
        this.header = page.getByTestId('header')
        this.input = page.getByTestId('text-input')
        this.toDoText = page.getByTestId('todo-item-label')
        this.buttonAll = page.getByRole('link', { name: 'All' })
        this.buttonActive = page.getByRole('link', { name: 'Active' })
        this.buttonCompleted = page.getByRole('link', { name: 'Completed' })
        this.buttonClearCompleted = page.getByRole('button', { name: 'Clear completed' })
        this.buttonDelete = page.getByTestId('todo-item-button')
        this.buttonToggleAll= page.getByTestId('toggle-all')

    }

    async countTodoItems(page): Promise<number>{
        const todoItemLabels = page.getByTestId('todo-item-label')
        const  numberOftasks = await todoItemLabels.count()
        return numberOftasks
    }
}