export default class SwapiService {

    _apiUrl = 'https://www.swapi.tech/api'

    getResource = async (url) => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received state status:${response.status}`)
        }
        return await response.json()
    }

    /**
     * data_type = 'people' || 'planets' || 'starships'
     */
    getData = async (data_type, id) => {
        const data = await this.getResource(`${this._apiUrl}/${data_type}/${id}/`)
        switch (data_type) {
            case 'people':
                return this._transformPeople(data.result.properties);
            case 'planets':
                return this._transformPlanet(data.result.properties)
            case 'starships':
                return this._transformStarship(data.result.properties)
            default:
                return null
        }

    }

    dataTransform = (data_type, data) => {
        return data.results.map(data_obj => {
            switch (data_type) {
                case 'people':
                    return {id: data_obj.uid, name: data_obj.name};
                case 'planets':
                    return {id: data_obj.uid, name: data_obj.name};
                case 'starships':
                    return {id: data_obj.uid, name: data_obj.name};
                default:
                    return null
            }
        })
    }

    /**
     * data_type = 'people' || 'planets' || 'starships'
     */
    getAllData = async (data_type) => {
        const array = []
        let data = await this.getResource(`${this._apiUrl}/${data_type}/`)
        array.push(...this.dataTransform(data_type, data))
        while (!!data.next) {
            data = await this.getResource(data.next)
            array.push(...this.dataTransform(data_type, data))
        }
        return array
    }

    _extractId(item) {
        const regex = /([1-9]*$)/
        return item.url.match(regex)[1]
    }

    _transformPeople = (data) => {
        if (data)
            return {
                id: this._extractId(data),
                name: data.name,
                gender: data.gender,
                birth_year: data.birth_year,
                eye_color: data.eye_color,
            }
        return {}
    }
    _transformStarship = (data) => {
        if (data)
            return {
                id: this._extractId(data),
                name: data.name,
                model: data.model,
                manufacturer: data.manufacturer,
                cost_in_credits: data.cost_in_credits,
                length: data.length,
                crew: data.crew,
                passengers: data.passengers,
                cargo_capacity: data.cargo_capacity
            }
        return {}
    }
    _transformPlanet = (data) => {
        if (data)
            return {
                id: this._extractId(data),
                name: data.name,
                population: data.population,
                rotation_period: data.rotation_period,
                diameter: data.diameter,
            }
        return {}
    }
}
