import React, {useState,useEffect,useCallback} from "react";

const Scoreboard = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [year, setYear] = useState([2020]);


    let content = {
        PilotClassments : {
            Id: [],
            Name: [],
            Surname: [],
            Constructor: [],
            Points : []
        },
        constructorClassments : {
            Name: [],
            Points : []
        }
    };
    const Pilot = content.PilotClassments;
    const Constructor = content.constructorClassments;

    let index =0;

    const setclassmentConstructor = (item)=>{
        for(const resultat of item){
            if(Constructor.Name.includes(resultat.Constructor.name)){
                Constructor.Points[resultat.Constructor.name] += parseInt(resultat.points);
            }
            else{
                Constructor.Points[resultat.Constructor.name] = parseInt(resultat.points);
                Constructor.Name[index] = resultat.Constructor.name;
                index= index+1;
            }
        }
    }
    const setclassmentPilot = (item)=>{

        for(const resultat of item){
            if(Pilot.Id.includes(resultat.Driver.driverId)){
                Pilot.Points[resultat.Driver.driverId] += parseInt(resultat.points);
            }
            else{
                Pilot.Points[resultat.Driver.driverId] = parseInt(resultat.points);
                Pilot.Id[index] = resultat.Driver.driverId;
                Pilot.Name[index] = resultat.Driver.familyName;
                Pilot.Surname[index] = resultat.Driver.givenName;
                Pilot.Constructor[index] = resultat.Constructor.name;
                index= index+1;
            }
        }
    }


    const displayscoreConstructor =(key)=>{
        const value = Constructor.Name[key];
            return <p> {value + " " +Constructor.Points[value]}</p>;
    }

    const displayscorePilot =(key)=>{
        const value = Pilot.Id[key];
        const value2 = Pilot.Constructor[key];
            return <p> {Pilot.Surname[key]+" "+ Pilot.Name[key] + " " +value2 + " " +Pilot.Points[value]}</p>;
    }

    useEffect(() => {
        fetch("http://ergast.com/api/f1/2020/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div>
                {/*<div>*/}
                {/*    <h1>Choose year :</h1>*/}
                {/*    <form>*/}
                {/*        <input type="text" id="year" required minLength="4" maxLength="4" value="Year"></input>*/}
                {/*        <input type="submit" value="Confirm" onClick={sendRequest}></input>*/}
                {/*    </form>*/}
                {/*</div>*/}
                {items.map((item, key) => {
                    {setclassmentConstructor(items[key].Results)}
                    {setclassmentPilot(items[key].Results)}
                })}
                <div>
                    <h1>Classment Pilot</h1>
                    <h2>{"Season - " + items[0].season }</h2>
                    {Pilot.Id.map((item2, key2) => {
                        return(
                            <div>
                                {displayscorePilot(key2)}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h1>Classment Constructeurs</h1>
                    <h2>{"Season - " + items[0].season }</h2>
                    {Constructor.Name.map((item3, key3) => {
                        return(
                            <div>
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


