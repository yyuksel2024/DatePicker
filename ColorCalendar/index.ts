import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MyCalendar from "./ColorCalendar";

interface Event {
    startDate: Date;
    endDate: Date;
}

export class PCFCalendar implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _notifyOutputChanged: () => void;

    private _events: Event[] = [];

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;

        const props = {
            onDateChange: this.onDateChange.bind(this)
        };

        ReactDOM.render(React.createElement(MyCalendar, props), container);
    }

    private onDateChange(events: Event[]): void {
        this._events = events;
        this._notifyOutputChanged();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update the view if necessary.
    }

    public getOutputs(): IOutputs {
        return {
            jsonData: JSON.stringify(this._events)
        };
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}
