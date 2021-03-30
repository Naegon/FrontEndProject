import React, {useState,useEffect} from "react";

const Mainpage = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let content = {
        PilotClassments : {
            Id: [],
            Name:[],
            Constructors: [],
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
                Pilot.Constructors[index] = resultat.Constructor.name;
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
        const value2 = Pilot.Constructors[key];
        return <p> {Pilot.Name[key] + " " +value2 + " " +Pilot.Points[value]}</p>;
    }

    useEffect(() => {
        fetch("http://ergast.com/api/f1/current/results.json?limit=1000")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races.slice(result.MRData.RaceTable.Races.length -3));
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

                    return(
                        <div>
                            <h1>{item.raceName}</h1>
                            <p>{item.season + " - Round " + item.round}</p>
                            <div>
                                <h2>Classment Pilots</h2>
                                {Pilot.Id.map((item2, key2) => {
                                    return(
                                        <div>
                                            {displayscorePilot(key2)}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <h2>Classment Constructeurs</h2>
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
                })}
            </div>
        );
    }
}

export default Mainpage;
