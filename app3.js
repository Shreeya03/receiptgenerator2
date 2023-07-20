const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const fs = require('fs');
const PDFDocument = require('pdfkit');
var string = require('string');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/kropbook', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
app.use(express.urlencoded({ extended: true }));
const reader = require('xlsx')

const { getJsDateFromExcel } = require("excel-date-to-js");


app.get('/', (req, res) => {
    res.render('dashboard.ejs')
})
app.get('/gen', async (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('Receipt.pdf'));
    let data = []
    fs.readFile('data.json', async (err, data) => {
        if (err) throw err;
        let student = await JSON.parse(data);
        doc

            .fontSize(4)
            .font('Courier-Bold')
            .text(student.name, { align: 'center' })
        doc.moveDown(5);
        let address = student.Address;
        let branchdet = student.branchdet;
        let acc = student.acc;
        doc.font('Courier').text(address.line1, {
            align: 'left',

        }
        );
        doc.text(address.line2, {
            align: 'left'
        }
        );
        doc.text(address.line3, {
            align: 'left'
        }
        );
        doc.text(address.line4, {
            align: 'left'
        }
        );
        doc.text(address.line5, {
            align: 'left'
        }
        );
        doc.text(address.line6, {
            align: 'left'
        }
        );
        doc.text(address.line7, {
            align: 'left'
        }
        );
        doc.text(address.line8, {
            align: 'left'
        }
        );
        doc.moveUp(4);
        doc.text(branchdet.branch, 400);
        doc.text(branchdet.act, 400);
        doc.text(branchdet.crd, 400);
        doc.text(branchdet.unc);
        doc.text(branchdet.oth);
        doc.text(branchdet.email);
        await doc.moveDown(7);
        doc.text(acc.no)
        doc.text(acc.id)
        doc.text(acc.jt1)
        doc.text(acc.jt2)
        doc.moveDown(3);
        doc.text(student.period, 75)
        funccc();
        doc.end()
    });
    async function funccc() {
        const file = reader.readFile('./database.xlsx')
        doc.moveDown();
        doc.font('Courier-Bold').text("TXN DATE", 50, 230)
        doc.text("VALUE DATE", 120, 230)
        doc.text("DESCRIPTION", 190, 230, {
            width: 90,
        })
        doc.text("REFERENCE", 290, 230)
        doc.text("DEBITS", 330, 230)
        doc.text("CREDITS", 400, 230)
        doc.text("BALANCE", 470, 230)
        doc.lineWidth(0.2);
        doc.moveTo(30, 225).lineTo(500, 225).stroke();
        doc.moveTo(30, 235).lineTo(500, 235).stroke();
        let ht = 240;

        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        let k = 0;
        for (let j = 0; j < data.length; j++) {
            let htt = doc.page.height;
            let d3 = (data[j].TXNDATE);
            if (d3) d3 = string(new Date(Math.round((d3 - '0' - 25569) * 86400 * 1000))).slice(4, 16);
            let d4 = (data[j].VALUEDATE);
            if (d4) d4 = string(new Date(Math.round((d4 - '0' - 25569) * 86400 * 1000))).slice(4, 16);
            doc.font('Courier').text(d3, 50, ht)
            doc.text(d4, 120, ht)
            doc.text(data[j].DESCRIPTION, 190, ht, {
                width: 90,
            })
            doc.text(data[j].REFERENCE, 290, ht)
            doc.text(data[j].DEBITS, 330, ht)
            doc.text(data[j].CREDITS, 400, ht)
            doc.text(data[j].BALANCE, 470, ht)


            ht = ht + 12;
            if (ht > (htt - 75 - k)) {
                k = 30;
                doc.addPage()
                ht = 20;
                doc.lineWidth(0.2);
                doc.font('Courier-Bold').text("TXN DATE", 50, ht)
                doc.text("VALUE DATE", 120, ht)
                doc.text("DESCRIPTION", 190, ht, {
                    width: 90,
                })
                doc.text("REFERENCE", 290, ht)
                doc.text("DEBITS", 330, ht)
                doc.text("CREDITS", 400, ht)
                doc.text("BALANCE", 470, ht)
                doc.moveTo(30, ht - 5).lineTo(500, ht - 5).stroke();
                doc.moveTo(30, ht + 5).lineTo(500, ht + 5).stroke();
                ht = ht + 12;
            }
        }
        doc.lineWidth(0.2);
        doc.moveTo(30, ht).lineTo(500, ht).stroke();
        doc.moveDown(6);
        doc.text("Opening Balance : 1,759,585.44 C\nTotal Debit Amt : 75,412,023.36\nTotal Credit Amt : 73,652,437.92 Dr Count : 317\nClosing Balance : 0.00 Cr Count : 191", 260)
        doc.moveDown(4);
        doc.font('Courier-Bold').text("******END OF STATEMENT******",)
    }
    res.download("Receipt.pdf");
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
