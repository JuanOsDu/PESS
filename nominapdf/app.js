const pdf = require("pdfmake");
const fs = require("fs");

const fonts = require("./fonts");
const styles = require("./styles");
const{content} = require("./pdfContent");

let docDefinition = {
    content: content,
    styles: styles
};

const printer = new pdf (fonts);

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdf/pdfTest.pdf"));
pdfDoc.end();