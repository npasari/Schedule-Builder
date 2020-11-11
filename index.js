//Name: Nayan Pasari
//ID: 111868106
var sql = require("mysql");
var sqlCon = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "hwdatabase"
});

const express = require("express");
const app = express();
const url = require('url');
const {
    query
} = require("express");

app.get("/", (req, res) => {
    doSearch(req, res);
});

app.get("/schedule", (req, res) => {
    writeSchedule(req, res);
});

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server connected!!!");
});

function doSearch(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    let query = url.parse(req.url, true).query;

    let search = query.search ? query.search : "";
    let filter = query.filter ? query.filter : "";

    let html = `
<!DOCTYPE html>
<html lang = "en">

<head>
<title>Spring 2021 CSE Class Find</title>
</head>
<style type="text/css">
        h2 {
            background: #007991;
            background: #D31027;
            background: -webkit-linear-gradient(to right, #EA384D, #D31027);
            background: linear-gradient(to right, #EA384D, #D31027);
            color: black;
            line-height: 1.1;
            padding: 20px 0;
            text-transform: uppercase;
            font-weight: normal;
            margin: 0;
            font-size: 25px;
            text-align: center;
            letter-spacing: 0.4rem;
            transition: letter-spacing, 2.0s;
            text-shadow: 1px 1px 1px black;
        }

        h2:hover {
            letter-spacing: 0.8rem;
        }

        #myInput {
            background-position: 10px 12px;
            background-repeat: no-repeat;
            width: 75%;
            font-size: 15px;
            padding: 12px 20px 12px 40px;
            border: 1px solid #ddd;
            margin-bottom: 12px;
        }

        #btn2:hover {
            background: #2b2b22;
            transition: all 0.3s;
            color: white;
        }

        #btn2 {
            font-size: 1.5em;
            background: white;
            color: black;
        }

        select{
            font-size: 1.3em;
        }

        </style>

<body>
<h2>SBU Class SChedule Builder</h2>
    <form method= "get" action= "/">
        <input type = "text" name = "search" id="myInput" value ="">
            <b style= "font-size: 1.5em;">in</b>
            <select name = "filter">
                <option value = "allFields">All Fields</option>
                <option value = "courseName">Course Title</option>
                <option value = "courseNum">Course Num</option>
                <option value = "instructor">Instructor</option>
                <option value = "days">Days</option>
                <option value = "time">Time</option>
            </select>
            <input type="submit" value = "Submit" id="btn2"><br>Example Searches : 316, Fodor, 4:00 Pm
    </form>
<br><br>
`;

    let sql = "SELECT * FROM hwdb;";

    //sql search all colmns
    if (filter == "allFields")
        sql = `SELECT * FROM hwdb
            WHERE Subj       LIKE '%` + search + `%' OR
            CRS      LIKE '%` + search + `%' OR
            CourseName      LIKE '%` + search + `%' OR
            Cmp       LIKE '%` + search + `%' OR
            Sctn       LIKE '%` + search + `%' OR
            Days       LIKE '%` + search + `%' OR
            StartTime       LIKE '%` + search + `%' OR
            EndTime       LIKE '%` + search + `%' OR
            StartDate       LIKE '%` + search + `%' OR
            EndDate       LIKE '%` + search + `%' OR
            Duration       LIKE '%` + search + `%' OR
            InstructionMode       LIKE '%` + search + `%' OR
            Building       LIKE '%` + search + `%' OR
            Room       LIKE '%` + search + `%' OR
            Instr      LIKE '%` + search + `%' OR
            EnrlCap       LIKE '%` + search + `%' OR
            WaitCap       LIKE '%` + search + `%' OR
            CmbndDescr       LIKE '%` + search + `%' OR
            CmbndEnrlCap     LIKE '%` + search + `%'`;
    else if (filter == "courseNum")
        sql = `SELECT * FROM hwdb
            WHERE CRS  LIKE '%` + search + `%';`;
    else if (filter == "courseName")
        sql = `SELECT * FROM hwdb
            WHERE CourseName LIKE '%` + search + `%';`;
    else if (filter == "instructor")
        sql = `SELECT * FROM hwdb
        WHERE Instr LIKE '%` + search + `%';`;
    else if (filter == "days")
        sql = `SELECT * FROM hwdb
        WHERE Days LIKE '%` + search + `%'`;
    else if (filter == "time")
        sql = `SELECT * FROM hwdb
        WHERE StartTime LIKE '%` + search + `%' OR
                EndTime  LIKE '%` + search + `%';`;

    sqlCon.query(sql, function (err, result) {
        if (err) throw err;
        for (let item of result) {
            html += `
            <div style="text-align: center;"><button type= "button" class="toggle" style="font-size: 1.5em;background: white;
            color: black;">CSE ` + item.CRS + ` - ` +
                item.CourseName + ` - ` + item.Cmp + ` - ` + item.Sctn + `</button></div>
            <pre style="text-align: center;font-family: Source Sans Pro;font-size:1.3em;">
            <strong>Days:</strong> ` + item.Days + `
            <strong>Start Time:</strong> ` + item.StartTime + `
            <strong>End Time:</strong> ` + item.EndTime + `
            <strong>Start Date:</strong> ` + item.StartDate + `
            <strong>EndDate:</strong> ` + item.EndDate + `
            <strong>Duration:</strong> ` + item.Duration + `
            <strong>Instruction Mode:</strong> ` + item.InstructionMode + `
            <strong>Building:</strong> ` + item.Building + `
            <strong>Room:</strong> ` + item.Room + `
            <strong>Instructor:</strong> ` + item.Instr + `
            <strong>Enrollment Cap:</strong> ` + item.EnrlCap + `
            <strong>Wait Cap:</strong> ` + item.WaitCap + `
            <strong>Combined Description:</strong> ` + item.CmbndDescr + `
            <strong>Combined Enrollment Cap:</strong> ` + item.CmbndEnrlCap + `<form action = "/schedule" method = "get">
            <button style=" background: #007991;
            background: #D31027;
            background: -webkit-linear-gradient(to right, #EA384D, #D31027);
            background: linear-gradient(to right, #EA384D, #D31027);
            font-size: 1em;
            padding: 1.5rem;
            border: 0;
            font-weight: bold;
            border-radius: 5px;
            width: auto;
            position: relative;" name= "add" value = "` + item.id + `">Add Class</button</form></pre>`;
        }
        res.write(html + "\n\n<body>\n</html>");
        res.end();
    });
};

function writeSchedule(req, res) {
    let query = url.parse(req.url, true).query;
    let addQuery = `INSERT INTO scheduledb SELECT * FROM hwdb WHERE hwdb.id="` + query.add + `";`

    let html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Course Schedule</title>
            <style type= text/css>
            table, tr, th, td{
                height: 50px;
                vertical-align: bottom;
                padding: 15px;
                text-align: left;
            }
            h1 {
                background: #007991;
                background: #D31027;
                background: -webkit-linear-gradient(to right, #EA384D, #D31027);
                background: linear-gradient(to right, #EA384D, #D31027);
                color: black;
                line-height: 1.1;
                padding: 20px 0;
                text-transform: uppercase;
                font-weight: normal;
                margin: 0;
                font-size: 25px;
                text-align: center;
                letter-spacing: 0.4rem;
                transition: letter-spacing, 2.0s;
                text-shadow: 1px 1px 1px black;
            }
    
            h1:hover {
                letter-spacing: 0.8rem;
            }

            .center {
                margin-left: auto;
                margin-right: auto;
                border: 1px solid black;
            }
            .abc{
                padding-left: 6px;
                background-color: #b3ecf5;
            }

            h2{
                color: #2c3e50;
                font-family: Source Sans Pro;
            }

            h3{
                letter-spacing: 0.3rem;
                text-transform: uppercase;
                color: black;
                text-align: center;
                font-size: 20px;
            }
    
            </style>
        </head>
        <body>
            <h1> Course Schedule</h1><br>
            <h3>SPRING 2021</h3>
            <h2>Name: Nayan Pasari<br>
		        ID: 111868106
            </h2>
            <a href = "/"><b>Back to Search</b></a>
            <br><br>
            <table class="center">
                <tr style="background-color: white; color: black;">
                    <th style="text-align: center; font-size: 1.3em;"> MON </th>
                    <th style="text-align: center;font-size: 1.3em;"> TUE </th>
                    <th style="text-align: center;font-size: 1.3em;"> WED </th>
                    <th style="text-align: center;font-size: 1.3em;"> THU </th>
                    <th style="text-align: center;font-size: 1.3em;"> FRI </th>
                </tr>
                <tr class="abc">
                    <td> Mon </td>
                    <td> Tue </td>
                    <td> Wed </td>
                    <td> Thu </td>
                    <td> Fri </td>
                </tr>
            </table>
        </body>
    </html>
`;
    sqlCon.query(addQuery, function (err, result) {
        if (err) console.log(err);
        sqlCon.query(buildDay("M"), function (err, result) {
            if (err) throw err;
            html = html.replace("<td> Mon </td>", renderDay(result, "MON"));
            sqlCon.query(buildDay("TU"), function (err, result) {
                if (err) throw err;
                html = html.replace("<td> Tue </td>", renderDay(result, "TUE"));
                sqlCon.query(buildDay("W"), function (err, result) {
                    if (err) throw err;
                    html = html.replace("<td> Wed </td>", renderDay(result, "WED"));
                    sqlCon.query(buildDay("TH"), function (err, result) {
                        if (err) throw err;
                        html = html.replace("<td> Thu </td>", renderDay(result, "THU"));
                        sqlCon.query(buildDay("F"), function (err, result) {
                            if (err) throw err;
                            html = html.replace("<td> Fri </td>", renderDay(result, "FRI"));
                            res.write(html + "\n\n</body>\n</html>");
                            res.end();
                        });
                    });
                });
            });
        });
    });

}

function buildDay(search) {
    var sql = `SELECT * FROM scheduledb
                WHERE Days  LIKE '%` + search + `%'`;
    return sql;
};

function renderDay(SQLResult, tableHeader) {
    let foo = "<td>";
    for (let item of SQLResult) {
        foo += "\n       <b> " + item.StartTime + " - " +
            item.EndTime + " <br><br>" +
            item.Subj + " " +
            item.CRS + " - " +
            item.Sctn + " </b> <p> " +
            item.CourseName + "<br><br>" +
            "Prof: " + item.Instr + "<br><br>" +
            "<br/><br/>";
    }
    return foo + "</td>";
}
