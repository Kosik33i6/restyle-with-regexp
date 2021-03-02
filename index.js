// https://github.com/Przemocny/gladiators_of_js_questlist/blob/main/Zbi%C3%B3r%20frontend/html_and_js/RestyleWithRegexp/RestyleWithRegexp.md

const items = document.querySelectorAll('div');
const item1 = document.querySelector('[data-styling=".bold"]');
const item2 = document.querySelector('[data-styling="strong"]');

function restylingImportantTexts(elements){
    console.log(elements);
    if(typeof elements !== "object") throw new Error('Elements must be an object');
    else if(elements.length > 1) {
        for(let i = 0; i < elements.length; i++) {
            restylingImportantTexts(elements[i]);
        };
        return;
    }

    if(elements instanceof HTMLElement !== true) throw new Error('Elements is not HTML Element');

    const elDataRegexp = elements.dataset.regexp.slice(1, elements.dataset.regexp.length - 1).split(",").join("|").replace(/'/g, "");
    const elDataStyling = elements.dataset.styling;

    const isContainClass = /\./.test(elDataStyling);
    const regExp = new RegExp(elDataRegexp, "gi");
    const replacedText = elements.innerHTML.replace(regExp, function(matched) {
        if(isContainClass) {
            const dataStyling = elDataStyling.slice(1, elDataStyling.length);
            return `<span class="${dataStyling}">${matched}</span>`;
        }
        return `<${elDataStyling}>${matched}</${elDataStyling}>`;
    });

    elements.innerHTML = replacedText;
}
restylingImportantTexts(items);