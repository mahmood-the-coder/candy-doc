export class FontTool {
    constructor({ api }) {
        this.api = api;
        this.button = document.createElement("div");
        
        
        // Create the dropdown
        this.select = document.createElement("select");
        this.select.style.width="50px"
        this.select.style.fontSize="x-small";
        // Populate the dropdown with fonts
        const windowsFonts = [
            "Agency FB", "Algerian", "Arial Narrow", "Arial Black", "Arial",
            "Arial Rounded MT", "Baskerville Old Face", "Bell MT", "Berlin Sans FB",
            "Bernard MT Condensed", "Blackadder ITC", "Bodoni MT", "Bodoni MT Condensed",
            "Bookman Old Style", "Book Antiqua", "Bradley Hand ITC", "Britannic Bold",
            "Broadway", "Brush Script MT Italic", "Calibri", "Californian FB",
            "Calisto MT", "Cambria", "Cambria Math", "Candara", "Castellar", "Centaur",
            "Century", "Century Gothic", "Century Schoolbook", "Chiller", "Consolas",
            "Comic Sans MS", "Colonna MT", "Constantia", "Cooper Black",
            "Copperplate Gothic", "Corbel", "Courier New", "Curlz MT", "Ebrima",
            "Edwardian Script ITC", "Elephant", "Engravers MT", "Eras ITC",
            "Felix Titling", "Footlight MT", "Forte", "Franklin Gothic",
            "Freestyle Script", "French Script MT", "Gabriola", "Garamond", "Georgia",
            "Gigi", "Gill Sans MT", "Gill Sans MT Condensed", "Gloucester",
            "Goudy Old Style", "Goudy Stout", "Haettenschweiler", "Harlow Solid Italic",
            "Harrington", "High Tower Text", "Impact", "Informal Roman", "Jokerman",
            "Juice ITC", "Kristen ITC", "Kunstler Script", "Leelawadee", "Lucida Bright",
            "Lucida Calligraphy", "Lucida Fax", "Lucida Handwriting", "Lucida Sans",
            "Lucida Typewriter", "Magneto", "Maiandra GD", "Matura MT Script Capitals",
            "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue",
            "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le",
            "Microsoft YaHei", "Microsoft Yi Baiti", "Mistral", "Modern No. 20",
            "Mongolian Baiti", "Monotype Corsiva", "MS Gothic", "MV Boli", "Niagara",
            "OCR A Extended", "Old English Text MT", "Onyx", "Palace Script MT",
            "Palatino Linotype", "Papyrus", "Parchment", "Perpetua",
            "Perpetua Titling MT", "Playbill", "Poor Richard", "Pristina", "Rage Italic",
            "Ravie", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold",
            "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Symbol",
            "Segoe UI", "Showcard Gothic", "SimSun-ExtB", "Snap ITC", "Stencil",
            "Sylfaen", "Tahoma", "Tempus Sans ITC", "Times New Roman", "Trebuchet MS",
            "Tw Cen MT", "TW Cen MT Condensed", "Verdana", "Viner Hand ITC", "Vivaldi",
            "Vladimir Script", "Wide Latin"
        ];

        windowsFonts.forEach(font => {
            const option = document.createElement("option");
            option.style.fontFamily = font;
            option.label = font;
            option.value = font;
            this.select.append(option);
        });

        this.button.append(this.select);

        // Event Listener for Font Selection
        this.select.addEventListener("change", (e) => {
            const font = e.target.value;

            // Ensure selection is applied
            document.execCommand('fontName', false, font);
        });
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
