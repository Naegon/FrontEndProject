import React, {useState} from "react";


const Scoreboard = ()=>{

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [year, setYear] = useState("");

    const [Pilotclassment,setPilotclassment] = useState([]) ;
    const [constructorClassments,setconstructorClassments] = useState([]) ;
    let constructorArray = []
    let pilotArray =[]

    const callApi = () =>{
        fetch("http://ergast.com/api/f1/"+year+"/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result.MRData.RaceTable.Races);
                    for(const item of result.MRData.RaceTable.Races){
                        setclassmentConstructor(item);
                        setclassmentPilot(item);
                    }

                },
                (error) => {
                    setError(error);
                }
            )
    }
    const setclassmentConstructor = (item)=>{
        let check = false;
        let points = 0;
        constructorArray = constructorClassments;
        for(const resultat of item.Results){
            for(const constructor of constructorClassments){
                if(constructor.name === (resultat.Constructor.name)){
                    constructor.points += parseInt(resultat.points);
                    check = true;
                }
            }
            if(check === false) {
                points = parseInt(resultat.points);
                constructorArray[constructorArray.length] = {name: resultat.Constructor.name, points: points}
            }
            check = false;
        }
        constructorArray.sort((n1,n2) => n2.points -n1.points);
        setconstructorClassments(constructorArray)
    }
    const setclassmentPilot = (item)=>{
        pilotArray = Pilotclassment
        let check = false;
        let points =0;
        for(const resultat of item.Results){
            for(const pilot of Pilotclassment){
                if(pilot.id === (resultat.Driver.driverId)){
                    pilot.points += parseInt(resultat.points);
                    check = true;
                }
            }
            if(check === false){
                points = parseInt(resultat.points);
                const id = resultat.Driver.driverId;
                const name = resultat.Driver.familyName;
                const surname = resultat.Driver.givenName;
                const constructor =  resultat.Constructor.name;
                pilotArray[pilotArray.length] = {id:id,name:name,surname:surname,constructor:constructor,points:points}
            }
            check = false;
        }
        pilotArray.sort((n1,n2) => n2.points -n1.points);
        setPilotclassment(pilotArray)
    }

    const displayscoreConstructor =(key)=>{
        const value = constructorClassments[key].name;
        return <p> {value + " " +constructorClassments[key].points}</p>;
    }

    const displayscorePilot =(key)=>{
        const value = Pilotclassment[key].constructor;
        return <p> {Pilotclassment[key].surname+" "+ Pilotclassment[key].name + " " +value + " " +Pilotclassment[key].points}</p>;
    }
    let handleSubmit = () =>{
        callApi()
    }

    let handleChange = (event) =>{
        setYear(event.target.value)
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }  else {
        return (
            <div>
                <div>
                    <h1>Choose year :</h1>
                    <form method="get" >
                        <input type="number" id="Year" required minLength="4" maxLength="4" value={year} onChange={handleChange} />
                        <input type="button" value="Confirm" onClick={handleSubmit}/>
                    </form>
                </div>
                <div>
                    <h1>Classment Pilot</h1>
                    <h2>{"Season - " + year }</h2>
                    {Pilotclassment.map((item2, key2) => {
                        return(
                            <div key={key2}>
                                {displayscorePilot(key2)}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h1>Classment Constructeurs</h1>
                    <h2>{"Season - " + year }</h2>
                    {constructorClassments.map((item3, key3) => {
                        return(
                            <div key={key3}>
                                {displayscoreConstructor(key3)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Scoreboard;


