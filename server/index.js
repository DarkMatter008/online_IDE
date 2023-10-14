const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res)=>{
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    if(language === "python"){
        language = "python3"
    }

    // let data = ({
    //     "code" : code,
    //     "language": language,
    //     "version": "latest",
    //     "input": input
    // });

    const config = {
        // API link https://rapidapi.com/Glavier/api/online-code-compiler
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '048f234599mshd064012f36d6c7dp1db5d8jsn950b88c91acf',
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        // data: data
        data: {
            language: language,
            version: 'latest',
            code: code,
            input: input
        }
    };

    //calling the code compilation API
    Axios(config)
        .then((response) => {
            res.send(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });

        // try {
        //     const response = await Axios.request(config);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }
})

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
});