
export enum TypeValues {
    yesNoSelection='yesNoSelection',
    expression='expression',
    bigstring='bigstring',
    selection='selection',
    viewOnly='viewOnly',
    boolean='boolean',
    string='string',
    number='number',
    binary='binary',
    assign='assign',
}

export interface ISuggestion {
    description: string;
    disabled: boolean;
    label: string;
    name: string;
    value: any;
}

export interface IProperties {
    suggestions?: ISuggestion[];
    editValueDisabled?: boolean;
    editNameDisabled?: boolean;
    valueHasError?: boolean;
    id: string | undefined;
    nameHasError?: boolean;
    information?: string;
    type: TypeValues;
    name: string;
    value: any;
}

export interface IItem {
    id: string | undefined;
    name: string;
    isHeader: boolean;
    properties: IProperties[];
}
