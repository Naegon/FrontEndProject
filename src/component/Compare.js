import React, {useState,useEffect} from "react";

const Compare = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [items, setItems] = useState([]);
    const [year, setYear] = useState();
    const [circuit, setcircuit] = useState();
    const [selectedOption,setselectedOption] = useState();

    let content = {
        Pilot : {
            Id: ["alonso","vettel"],
            Name:["alonso","vettel"],
            Surname: ["Fernando","Sebastian"],
            Wins : [],
            Perf :  [],
            NbRaces :  [],
        },
    };
    const Pilot = content.Pilot;

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

        Pilot.Perf[pilotName] = perf;
        Pilot.NbRaces[pilotName] = item.length;
        console.log(Pilot.Perf[pilotName],pilotName);
        setIsLoaded(true);
    }
    const setclassmentPilotWins = (item,pilotName)=>{
        let wins =0;
        for(const resultat of item){
            wins = wins +1;
        }
        Pilot.Wins[pilotName] = wins;
        console.log(Pilot.Wins[pilotName],pilotName);
        setIsLoaded(true);
    }

    const displayscorePilot =(key)=>{
        const value = Pilot.Id[key];
        console.log(Pilot.Wins[value],value);
        if(Pilot.Wins[value] != null){
            return <p> {Pilot.Name[key] + " " +Pilot.Surname[key] + " : " +Pilot.Wins[value]+" wins"}</p>;
        }
        else if(Pilot.Perf[value] != null){
            return <p> {Pilot.Name[key] + " " +Pilot.Surname[key] + " : " +Pilot.Perf[value]+" ratio on "+Pilot.NbRaces[value]+" races"}</p>;
        }
        else {
            return <p> {Pilot.Name[key] + " " +Pilot.Surname[key]}</p>;
        }
    }

    let handleSubmit = () =>{
        setIsLoaded(false);
        let urlwins ="";
        if(selectedOption === "Wins") {
            urlwins = "/1";
        }
            for(const pilot of Pilot.Id){
                console.log(pilot);
                let url = "";
                if((year!=null) && (circuit!=null)){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+pilot+"/circuits/"+circuit+"/results"+urlwins+".json");
                }
                else if(year!=null){
                    url = ("https://ergast.com/api/f1/"+year+"/drivers/"+pilot+"/results"+urlwins+".json?limit=100");
                }
                else if(circuit!=null){
                    url = ("https://ergast.com/api/f1/drivers/"+pilot+"/circuits/"+circuit+"/results"+urlwins+".json?limit=100");
                }
                else{
                    url = ("https://ergast.com/api/f1/drivers/"+pilot+"/results"+urlwins+".json?limit=500");//add limit=500 because of default 30 limit
                }
                callApi(pilot,url);
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

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div>
                <div>
                    <h1>Compare Drivers:</h1>
                    <form method="get" onSubmit={handleSubmit}>
                        <div>
                            <label>Year : </label>
                            <input type="text" id="Year" minLength="4" maxLength="4" value={year} onChange={handleChangeYear}></input>
                        </div>
                        <div>
                            <label>Circuit : </label>
                            <input type="text" id="circuit" value={circuit} onChange={handleChangeCircuit}></input>
                        </div>
                        <div>
                            <input type="radio" id="performance" value="performance" onChange={handleOptionChange} ></input>
                            <label>Performance : </label>
                            <input type="radio" id="wins" value="Wins" onChange={handleOptionChange}></input>
                            <label>More Wins : </label>
                        </div>
                        <input type="submit" value="Confirm"></input>
                    </form>
                </div>

                <div>
                    <h1>Pilot on compare</h1>
                    {Pilot.Id.map((item2, key2) => {
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
