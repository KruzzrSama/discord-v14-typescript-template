import { Events } from "discord.js";
import Artech from "./client.base";

type EventProps = { name: string; enabled?: boolean; }
export default class Event {
    client: Artech;
    name: string;
    enabled: boolean = true;
    public listener(...args: any[]) { }
    constructor(client: Artech, props: EventProps) {
        this.client = client;
        this.name = props.name;
        if (props.enabled) this.enabled = props.enabled;
    }
    public on() {
        if (!this.enabled) return;
        this.client.on(this.name, this.listener);
    }
}