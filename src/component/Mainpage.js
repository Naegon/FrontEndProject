import React, {useState,useEffect} from "react";

const Mainpage = ()=>{

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch("http://ergast.com/api/f1/current/last/results.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.MRData.RaceTable.Races[0]);
                    console.log(result);
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
                <h1>{items.raceName}</h1>
                <p>{items.season + " - Round " + items.round}</p>
                {items.Results.map((item, key) => {
                    return(
                        <div key={key}>
                            <p>{item.position}</p>
                            <p>{}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Mainpage;
