class API {

    async getData() {
        const url = 'https://api.datos.gob.mx/v1/precio.gasolina.publico';
        const totalGasStation = await (await (await fetch(url)).json()).pagination.total;
        
        // get data from API
        const data = await fetch(`${url}?pageSize=${totalGasStation}`);

        // return data like json
        const responseJSON = await data.json();

        return {
            responseJSON
        }
    }
}