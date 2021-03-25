import React, {useState,useEffect} from "react";

const Scoreboard = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    let content = {
        PilotClassments : {
            PilotId: [],
            PilotConstructors: [],
            Points : []
        },
        constructorClassments : {
            constructorNames: [],
            Points : []
        }
    };
    const Pilot = content.PilotClassments;
    const Constructor = content.constructorClassments;

    let index =0;

    const setclassmentConstructor = (item)=>{
        for(const resultat of item){
            if(Constructor.constructorNames.includes(resultat.Constructor.name)){
                Constructor.Points[resultat.Constructor.name] += parseInt(resultat.points);
            }
            else{
                Constructor.Points[resultat.Constructor.name] = parseInt(resultat.points);
                Constructor.constructorNames[index] = resultat.Constructor.name;
                index= index+1;
            }
        }
    }
    const setclassmentPilot = (item)=>{

        for(const resultat of item){
            if(Pilot.PilotId.includes(resultat.Driver.driverId)){
                Pilot.Points[resultat.Driver.driverId] += parseInt(resultat.points);
            }
            else{
                Pilot.Points[resultat.Driver.driverId] = parseInt(resultat.points);
                Pilot.PilotId[index] = resultat.Driver.driverId;
                Pilot.PilotConstructors[index] = resultat.Constructor.name;
                index= index+1;
            }
        }
    }


    const displayscoreConstructor =(key)=>{
        const value = Constructor.constructorNames[key];
            return <p> {value + " " +Constructor.Points[value]}</p>;
    }

    const displayscorePilot =(key)=>{
        const value = Pilot.PilotId[key];
        const value2 = Pilot.PilotConstructors[key];
            return <p> {value + " " +value2 + " " +Pilot.Points[value]}</p>;
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
                {items.map((item, key) => {
                    {setclassmentConstructor(items[key].Results)}
                    {setclassmentPilot(items[key].Results)}
                })}
                <div>
                    <h1>Classment Pilot</h1>
                    {Pilot.PilotId.map((item2, key2) => {
                        return(
                            <div>
                                {displayscorePilot(key2)}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h1>Classment Constructeurs</h1>
                    {Constructor.constructorNames.map((item3, key3) => {
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


