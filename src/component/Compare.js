import React, {useState} from "react";
import "../css/compare.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Compare = ()=>{

    const [error, setError] = useState(null);
    const [year, setYear] = useState("");
    const [circuit, setcircuit] = useState("");
    const [selectedOption,setselectedOption] = useState("");
    const [showPopup,setshowPopup] = useState(false)

    let content = [
        { id:"badoer", name:"badoer",surname:"Luca",wins : null, perf :  null, nbRaces :null},
        { id:"alonso", name:"alonso",surname:"Fernando",wins : null, perf :  null, nbRaces :null}
    ];
    const [pilot,setPilot] = useState(content) ;

    const callApi = (pilotName,url) =>{
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    // setItems(result.MRData.RaceTable.Races);
                    if(selectedOption === "Wins"){
                        setclassmentPilotWins(result.MRData.RaceTable.Races,pilotName);
                    }
                    else{
                        setclassmentPilotPerf(result.MRData.RaceTable.Races,pilotName);
                    }
                },
                (error) => {
                    setError(error);
                }
            )
    }

    const setclassmentPilotPerf = (item,pilotName)=>{
        let perf =0;
        for(const resultat of item){

           perf += parseInt(resultat.Results[0].position);
        }
        perf = parseInt(perf/item.length);

        for(const racer of content){
            if(racer.id === pilotName){
                racer.perf = perf;
                racer.nbRaces = item.length;
                console.log(racer.perf,pilotName);
            }
        }
        content.sort((n1,n2) => n1.perf -n2.perf);
    }
    const setclassmentPilotWins = (item,pilotName)=>{
        for(const racer of content){
            if(racer.id === pilotName){
                racer.wins = item.length;
                console.log(racer.wins,pilotName);
            }
        }
        content.sort((n1,n2) => n2.wins -n1.wins);
    }

    const displayscorePilot =(key)=>{
        const value = pilot[key]
        console.log(value.wins,value);
        if(value.wins != null){
            return <p> {value.name + " " +value.surname + " : " +value.wins+" wins"}</p>;
        }
        else if(value.perf != null){
            return <p> {value.name + " " +value.surname + " : " +value.perf+" ratio on "+value.nbRaces+" races"}</p>;
        }
        else {
            return <p> {value.name + " " +value.surname}</p>;
        }
    }

    let handleSubmit = () =>{
        let urlwins ="";
        if(selectedOption === "Wins") {
            urlwins = "/1";
        }
            for(const Pilot of pilot){
                console.log(Pilot);
                let url = "";
                if((year!=="") && (circuit!=="")){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+Pilot.id+"/circuits/"+circuit+"/results"+urlwins+".json");
                }
                else if(year!==""){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+Pilot.id+"/results"+urlwins+".json?limit=100");
                }
                else if(circuit!==""){
                    url = ("https://ergast.com/api/f1/drivers/"+Pilot.id+"/circuits/"+circuit+"/results"+urlwins+".json?limit=100");
                }
                else{
                    url = ("https://ergast.com/api/f1/drivers/"+Pilot.id+"/results"+urlwins+".json?limit=500");//add limit=500 because of default 30 limit
                }
                callApi(Pilot.id,url);
            }
        setPilot(content)
        setPilot(content)
        togglePopup()
    }

    const handleChangeYear = (event) =>{
        setYear(event.target.value);
    }
    const handleChangeCircuit = (event) =>{
        setcircuit(event.target.value);
    }
    const handleOptionChange = (event) =>{
        setselectedOption(event.target.value);
        console.log(event.target.value)
    }
    const togglePopup = () => {
        setshowPopup(true)
    }
    const disactivePopup = () => {
        setshowPopup(false)
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }  else {
        return (
            <div className="c-container c-compare" id="compare">
                <div className="c-compare__filterDriver">
                    <h1 id="compareDriversTitle">Compare Drivers:</h1>
                    <FormControl className="c-compare__form" component="fieldset">
                        <div className="c-compare-filterinput" >
                            <label>Year : </label>
                            <input type="number" id="year" minLength="4" maxLength="4" value={year} onChange={handleChangeYear} />
                        </div>
                        <div className="c-compare-filterinput" >
                            <label id="circuitlabel">Circuit : </label>
                            <input type="text" id="circuit" value={circuit} onChange={handleChangeCircuit} />
                        </div>
                        <RadioGroup aria-label="gender" name="gender1" value={selectedOption} onChange={handleOptionChange}>
                            <FormControlLabel value="performance" control={<Radio />} label="Performance" />
                            <FormControlLabel value="Wins" control={<Radio />} label="Wins" />
                        </RadioGroup>
                        <input id="buttonConfirm" type="button" value="Confirm" onClick={handleSubmit} />
                    </FormControl>
                    <div className="c-compare__popup">
                        <div className={showPopup ? " Popup" : "Popup hidepopup"}>
                            <h1>Compare set</h1>
                            <button onClick={disactivePopup}>Close</button>
                        </div>
                    </div>

                </div>
                <div className="c-compare-pilotOnCompare">
                    <h1 id="PilotOnCompareTitle">Pilot on compare</h1>
                    {pilot.map((item2, key2) => {
                        return(
                            <div key={key2}>
                                {displayscorePilot(key2)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Compare;
