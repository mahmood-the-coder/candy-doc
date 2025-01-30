import { getColorInput } from "../editor-UI/color/index.js";

export class ForeColorTool {
    constructor({ api }) {
        this.api = api;
        this.button = document.createElement("div")
        this.button.style.scale="0.7"
        this.button.append(getColorInput())
        this.button.querySelector("input").style.backgroundColor = "black"
        this.button.querySelector("input").style.border = "1px solid var(--color)"


        this.button.querySelector("input").addEventListener("mousedown", (e) => {
            e.preventDefault()


        })
        this.button.addEventListener("input", (e) => {
            document.execCommand('foreColor', false, e.target.value);

        })
    }

    static get isInline() {
        return true;
    }

    render() {

        return this.button;
    }



    static get sanitize() {
        return {
            span: {
                style: true,
            },
        };
    }
}

export class BackColorTool {
    constructor({ api }) {
        this.api = api;
        this.button = document.createElement("div")
        this.button.style.scale="0.7"
        this.button.append(getColorInput())
        this.button.querySelector("input").style.backgroundColor = "white"
        this.button.querySelector("input").style.border = "1px solid var(--color)"

   
        this.button.querySelector("input").addEventListener("mousedown", (e) => {
            e.preventDefault()


        })
        this.button.addEventListener("input", (e) => {
            document.execCommand('backColor', false, e.target.value);

        })
    }

    static get isInline() {
        return true;
    }

    render() {

        return this.button;
    }



    static get sanitize() {
        return {
            span: {
                style: true,
            },
        };
    }
}