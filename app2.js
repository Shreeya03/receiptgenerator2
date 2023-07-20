const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
var string = require('string');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
const reader = require('xlsx')

const { getJsDateFromExcel } = require("excel-date-to-js");
app.get('/', (req, res) => {
    res.render('dashboard.ejs')
})
app.get('/gen', async (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('Receipt.pdf'));
    
    // .text('This the article for GeeksforGeeks', 100, 100);
    // doc.end();
    let data = []
        fs.readFile('data.json', async (err, data) => {
        if (err) throw err;
        let student = await JSON.parse(data);
        // console.log(student);
        console.log(student.name);
        doc
    
        .fontSize(4)
        .font('Courier-Bold')
        .text(student.name,{align: 'center'})
        doc.moveDown(5);
        let address=student.Address;
        let branchdet=student.branchdet;
        let acc=student.acc;
        doc.font('Courier').text(address.line1, {
        align: 'left',
        margin : 50
        }
        );
        // doc.moveDown();
        doc.text(address.line2, {
            align: 'left'
        }
        );
        
        // doc.moveDown();
        doc.text(address.line3, {
            align: 'left'
        }
        );
        
        // doc.moveDown();
        doc.text(address.line4, {
            align: 'left'
        }
        );
        
        // doc.moveDown();
        doc.text(address.line5, {
            align: 'left'
            }
            );
            
            // doc.moveDown();
            doc.text(address.line6, {
                align: 'left'
            }
            );
            
            // doc.moveDown();
            doc.text(address.line7, {
                align: 'left'
            }
            );
            
            // doc.moveDown();
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
        
        // console.log(accdet);
        doc.text(acc.no)
        doc.text(acc.id)
        doc.text(acc.jt1)
        doc.text(acc.jt2)
        doc.moveDown(3);
        doc.text(student.period,75)
        funccc();
        doc.end()
        // res.download("Receipt.pdf");
    });
    // console.log("11111");
    function funccc(){
        const file = reader.readFile('./database.xlsx')
        doc.moveDown();
        doc.font('Courier-Bold').text("TXN DATE", 50,230)
        doc.text("VALUE DATE", 120,230)
        doc.text("DESCRIPTION", 190,230)
        doc.text("REFERENCE", 290,230)
        doc.text("DEBITS", 330,230)
        doc.text("CREDITS", 400,230)
        doc.text("BALANCE", 470,230)
        // doc.rect(30, 225, 480, 0).stroke();
        doc.lineWidth(0.2);
        doc.moveTo(30, 225).lineTo(500, 225).stroke();
        doc.moveTo(30, 235).lineTo(500, 235).stroke();
        let ht=240;
    
        const sheets = file.SheetNames
        
        for(let i = 0; i < sheets.length; i++)
        {
        const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
        }
        k=1;
        let htt=doc.page.height;
        // doc.addPage()
        for(let j=0;j<40;j++){
                let d3=(data[j].TXNDATE);
                if(d3)d3= string(new Date(Math.round((d3-'0' - 25569)*86400*1000))).slice(4,16);
                let d4=(data[j].VALUEDATE);
                if(d4)d4= string(new Date(Math.round((d4-'0' - 25569)*86400*1000))).slice(4,16);
                // let d1=(string(getJsDateFromExcel(string(d3))).slice(0,10));
                // let d2=(string(getJsDateFromExcel(string(d4))).slice(0,10));
                doc.font('Courier').text(d3, 50,ht)
                doc.text(d4, 120,ht)
                doc.text(data[j].DESCRIPTION, 190,ht)
                doc.text(data[j].REFERENCE, 290,ht)
                doc.text(data[j].DEBITS, 330,ht)
                doc.text(data[j].CREDITS, 400,ht)
                doc.text(data[j].BALANCE, 470,ht)
            
            
            ht=ht+12;
            // if (ht>(htt-30)){
            //     break;
            // }
        }
        doc.addPage()
        ht=20;
        doc.lineWidth(0.2);
        doc.font('Courier-Bold').text("TXN DATE", 50,ht)
        doc.text("VALUE DATE", 120,ht)
        doc.text("DESCRIPTION", 190,ht)
        doc.text("REFERENCE", 290,ht)
        doc.text("DEBITS", 330,ht)
        doc.text("CREDITS", 400,ht)
        doc.text("BALANCE", 470,ht)
        doc.moveTo(30, ht-5).lineTo(500, ht-5).stroke();
        doc.moveTo(30, ht+5).lineTo(500, ht+5).stroke();
        ht=ht+12;
        for(let j=40;j<90;j++){
            let d3=(data[j].TXNDATE);
            if(d3)d3= string(new Date(Math.round((d3-'0' - 25569)*86400*1000))).slice(4,16);
            let d4=(data[j].VALUEDATE);
            if(d4)d4= string(new Date(Math.round((d4-'0' - 25569)*86400*1000))).slice(4,16);
            // let d1=(string(getJsDateFromExcel(string(d3))).slice(0,10));
            // let d2=(string(getJsDateFromExcel(string(d4))).slice(0,10));
            doc.font('Courier').text(d3, 50,ht)
            doc.text(d4, 120,ht)
            doc.text(data[j].DESCRIPTION, 190,ht)
            doc.text(data[j].REFERENCE, 290,ht)
            doc.text(data[j].DEBITS, 330,ht)
            doc.text(data[j].CREDITS, 400,ht)
            doc.text(data[j].BALANCE, 470,ht)
        
        
        ht=ht+12;
        // if (ht>(htt-30)){
        //     break;
        // }
        }
        doc.addPage()
        ht=20;
        doc.lineWidth(0.2);
        doc.font('Courier-Bold').text("TXN DATE", 50,ht)
        doc.text("VALUE DATE", 120,ht)
        doc.text("DESCRIPTION", 190,ht)
        doc.text("REFERENCE", 290,ht)
        doc.text("DEBITS", 330,ht)
        doc.text("CREDITS", 400,ht)
        doc.text("BALANCE", 470,ht)
        doc.moveTo(30, ht-5).lineTo(500, ht-5).stroke();
        doc.moveTo(30, ht+5).lineTo(500, ht+5).stroke();
        ht=ht+12;
        for(let j=90;j<data.length;j++){
            let d3=(data[j].TXNDATE);
            if(d3)d3= string(new Date(Math.round((d3-'0' - 25569)*86400*1000))).slice(4,16);
            let d4=(data[j].VALUEDATE);
            if(d4)d4= string(new Date(Math.round((d4-'0' - 25569)*86400*1000))).slice(4,16);
            // let d1=(string(getJsDateFromExcel(string(d3))).slice(0,10));
            // let d2=(string(getJsDateFromExcel(string(d4))).slice(0,10));
            doc.font('Courier').text(d3, 50,ht)
            doc.text(d4, 120,ht)
            doc.text(data[j].DESCRIPTION, 190,ht)
            doc.text(data[j].REFERENCE, 290,ht)
            doc.text(data[j].DEBITS, 330,ht)
            doc.text(data[j].CREDITS, 400,ht)
            doc.text(data[j].BALANCE, 470,ht)
        
        
        ht=ht+12;
        // if (ht>(htt-30)){
        //     break;
        // }
        }
        
        doc.moveDown(6);
        doc.text("Opening Balance : 1,759,585.44 C\nTotal Debit Amt : 75,412,023.36\nTotal Credit Amt : 73,652,437.92 Dr Count : 317\nClosing Balance : 0.00 Cr Count : 191",260)
        doc.moveDown(4);
        doc.font('Courier-Bold').text("******END OF STATEMENT******",)
        
        // console.log(data);
        // console.log((string(getJsDateFromExcel("42510")).slice(0,10)).s)
    }
    
    // doc.end()
    // res.render('dashboard.ejs')
    res.download("Receipt.pdf");
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
