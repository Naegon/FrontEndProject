import React, {useState,useEffect} from "react";

const Compare = ()=>{

    const [error, setError] = useState(null);
    const [year, setYear] = useState();
    const [circuit, setcircuit] = useState();
    const [selectedOption,setselectedOption] = useState();

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
        perf = perf/item.length;

        for(const racer of content){
            if(racer.id === pilotName){
                racer.perf = perf;
                racer.nbRaces = item.length;
                console.log(racer.perf,pilotName);
            }
        }
        content.sort((n1,n2) => n1.perf -n2.perf);
        setPilot(content)
    }
    const setclassmentPilotWins = (item,pilotName)=>{
        let wins =0;
        for(const resultat of item){
            wins = wins +1;
        }
        for(const racer of content){
            if(racer.id === pilotName){
                racer.wins = wins;
                console.log(racer.wins,pilotName);
            }
        }
        content.sort((n1,n2) => n2.wins -n1.wins);
        setPilot(content)
    }

    const displayscorePilot =(key)=>{
        let index =0;
        for(const racer of content){
            index++;
        }
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
                if((year!=null) && (circuit!=null)){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+Pilot.id+"/circuits/"+circuit+"/results"+urlwins+".json");
                }
                else if(year!=null){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+Pilot.id+"/results"+urlwins+".json?limit=100");
                }
                else if(circuit!=null){
                    url = ("https://ergast.com/api/f1/drivers/"+Pilot.id+"/circuits/"+circuit+"/results"+urlwins+".json?limit=100");
                }
                else{
                    url = ("https://ergast.com/api/f1/drivers/"+Pilot.id+"/results"+urlwins+".json?limit=500");//add limit=500 because of default 30 limit
                }
                callApi(Pilot.id,url);
            }
    }

    let handleChangeYear = (event) =>{
        setYear(event.target.value);
    }
    let handleChangeCircuit = (event) =>{
        setcircuit(event.target.value);
    }
    let handleOptionChange = (event) =>{
        setselectedOption(event.target.value);
        console.log(event.target.value);
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }  else {
        return (
            <div>
                <div>
                    <h1>Compare Drivers:</h1>
                    <form method="get">
                        <div>
                            <label>Year : </label>
                            <input type="number" id="Year" minLength="4" maxLength="4" value={year} onChange={handleChangeYear} />
                        </div>
                        <div>
                            <label>Circuit : </label>
                            <input type="text" id="circuit" value={circuit} onChange={handleChangeCircuit} />
                        </div>
                        <div>
                            <input type="radio" id="performance" value="performance" onChange={handleOptionChange} />
                            <label>Performance : </label>
                            <input type="radio" id="wins" value="Wins" onChange={handleOptionChange} />
                            <label>More Wins : </label>
                        </div>
                        <input type="onclick" value="Confirm" onClick={handleSubmit} />
                    </form>
                </div>

                <div>
                    <h1>Pilot on compare</h1>
                    {pilot.map((item2, key2) => {
                        return(
                            <div>
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
