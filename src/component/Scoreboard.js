import React, {useState} from "react";

import "../css/scoreboard.css"


const Scoreboard = ()=>{

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [year, setYear] = useState("");

    const initialstate =[]
    const [Pilotclassment,setPilotclassment] = useState(initialstate) ;
    const [constructorClassments,setconstructorClassments] = useState(initialstate) ;
    let constructorArray = []
    let pilotArray =[]


    const callApi = () =>{
        fetch("http://ergast.com/api/f1/"+year+"/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result.MRData.RaceTable.Races);
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
        for(const resultat of item.Results){/*set the classment of the race */
            for(const constructor of constructorClassments){
                if(constructor.name === (resultat.Constructor.name)){/*if the name of the constructor is already on the list, just add points*/
                    constructor.points += parseInt(resultat.points);
                    check = true;
                }
            }
            if(check === false) {/*else add points and name of the constructor*/
                points = parseInt(resultat.points);
                constructorArray[constructorArray.length] = {name: resultat.Constructor.name, points: points}
            }
            check = false;
        }
        constructorArray.sort((n1,n2) => n2.points -n1.points);
    }
    const setclassmentPilot = (item)=>{
        pilotArray = Pilotclassment
        let check = false;
        let points =0;
        for(const resultat of item.Results){/*set the classment of the pilot on the race we sort because it for all the year and not one race */
            for(const pilot of Pilotclassment){
                if(pilot.id === (resultat.Driver.driverId)){/*if the name of the pilot is already on the list, just add points*/
                    pilot.points += parseInt(resultat.points);
                    check = true;
                }
            }
            if(check === false){/*else add points and name of the pilot*/
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
    }

    const resetclassment = () =>
    {
        pilotArray = Pilotclassment
        constructorArray = constructorClassments;

        for(const pilot of Pilotclassment)
        {
            pilot.points = 0;
        }

        for(const constructor of constructorClassments)
        {
            constructor.points = 0;
        }
    }

    let handleSubmit = () =>{
        resetclassment()
        for(const item of items){
            setclassmentConstructor(item)
            setclassmentPilot(item)
        }
        callApi()
    }

    let handleChange = (event) =>{
        setYear(event.target.value)
        setPilotclassment(pilotArray)
        setconstructorClassments(constructorArray)
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }  else {
        return (
            <div className="c-container c-scoreboard" id="scoreboard">
                <div className="c-scoreboard-form">
                    <h1>Choose a year :</h1>
                    <form className="form-searchBar">
                        <input type="number" id="Year" required minLength="4" maxLength="4" value={year} onChange={handleChange} />
                        <input type="button" value=" " onClick={handleSubmit}/>
                    </form>
                </div>
                <div className="c-scoreboard-wrapper">
                    <div className="c-scoreboard-classment c-scoreboard-grey">
                        <h1>Classment Pilot</h1>
                        <h2>{"Season - " + year }</h2>
                        <div className="c-mainpage_colName ">
                            <h4>Pos.</h4>
                            <h4>Driver</h4>
                            <h4>Constructor</h4>
                            <h4>Points</h4>
                        </div>
                        {Pilotclassment.slice(0, 10).map((item2, key2) => {
                            return(
                                <div className="c-scoreboard-content" key={key2}>
                                    <p className="e-scoreboard-pos">{key2+1}</p>
                                    <p> {Pilotclassment[key2].surname+" "+Pilotclassment[key2].name}</p>
                                    <p> {Pilotclassment[key2].constructor}</p>
                                    <p> {Pilotclassment[key2].points}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="c-scoreboard-classment c-scoreboard-black">
                        <h1>Classment Constructeurs</h1>
                        <h2>{"Season - " + year }</h2>
                        <div className="c-scoreboard_colName c-scoreboard_colName-constructor">
                            <h4>Pos.</h4>
                            <h4>Constructor</h4>
                            <h4>Points</h4>
                        </div>
                        {constructorClassments.slice(0, 10).map((item3, key3) => {
                            return(
                                <div className="c-scoreboard-content c-scoreboard-content-container" key={key3}>
                                    <p className="e-scoreboard-pos">{key3+1}</p>
                                    <p> {item3.name}</p>
                                    <p> {item3.points}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Scoreboard;


