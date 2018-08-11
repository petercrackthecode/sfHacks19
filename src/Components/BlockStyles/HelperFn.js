export const getTextFontSize = (input) => {
    switch (input) {
        case "font-10":
            return 'font-10';
        case "font-18":
            return 'font-18';
        case "font-22":
            return 'font-22';
        case "font-28":
            return 'font-28';
        case "font-36":
            return 'font-36';
        case "font-44":
            return 'font-44';
        case "font-56":
            return 'font-56';
        case "font-72":
            return 'font-72';
        default:
            return null;
    }
};