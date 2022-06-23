const express = require('express');
const app = express();

app.use(express.static('abc'));
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
	port:3306
});

app.get("/getdetail",(req, res)=>{
    let bookid=req.query.bookid;
    let output={status:false,book:{bookid:0,bookname:"",price:0}};
    con.query('select * from book where bookid=?',[bookid],(err,rows)=>{
        if(err){
            console.log("Error Occurred");
        }else{
            if(rows.length>0){
                output.status=true;
                output.book.bookname=rows[0].bookname;
                output.book.price=rows[0].price;
            }else{
                output.status=false;
                console.log("bookid not found");
            }
            
        }
        res.send(output);
    });
	

    });

    app.get("/update",(req, res)=>{
        let bookid=req.query.bookid;
        let price=req.query.price;
        let output={status:false,book:{bookid:0,bookname:"",price:0}};
        con.query('update book set price=? where bookid=?',[price,bookid],(err,rows)=>{
            if(err){
                console.log("Error Occurred");
            }else{
                if(rows.affectedRows===0){
                    output.status=false;
                    console.log("bookid not found");
                }else{
                    output.status=true;
                    console.log("update successful");
                }
                
            }
            res.send(output);
        });
        
    
        });

    app.listen(800, function () {
        console.log("server listening at port 800...");
    });
