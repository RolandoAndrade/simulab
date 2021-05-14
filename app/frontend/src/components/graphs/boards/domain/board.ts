export abstract class Board {
    protected constructor(protected readonly container: HTMLElement) {
    }

    /**
     * @description Imports a previous created model.
     * @param model Model to be imported.
     * */
    public abstract importModel(model: any): void;

    onSelectionChanged(...args: any[]){

    }

    onModelChanged(...args: any[]) {

    }
}
