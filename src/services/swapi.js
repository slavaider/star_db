export default class SwapiService {

    _apiUrl = 'https://swapi.dev/api'

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
        const data = await this.getResource(`${this._apiUrl}/${data_type}/${id}/`).catch((error) => console.error(error))
        switch (data_type) {
            case 'people':
                return this._transformPeople(data, id)
            case 'planets':
                return this._transformPlanet(data, id)
            case 'starships':
                return this._transformStarship(data, id)
            default:
                return null
        }

    }

    dataTransform = (data_type, data) => {
        return data.results.map(data_obj => {
            switch (data_type) {
                case 'people':
                    return this._transformPeople(data_obj, data_obj.name)
                case 'planets':
                    return this._transformPlanet(data_obj, data_obj.name)
                case 'starships':
                    return this._transformStarship(data_obj, data_obj.name)
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
        let data = await this.getResource(`${this._apiUrl}/${data_type}/`).catch((error) => console.error(error))
        array.push(...this.dataTransform(data_type, data))
        while (!!data.next) {
            data = await this.getResource(data.next)
            array.push(...this.dataTransform(data_type, data))
        }
        return array
    }

    _extractId(item) {
        const regex = /\/([0-9]*)\/$/
        return item.url.match(regex)[1]
    }

    _transformPeople = (data) => {
        return {
            id: this._extractId(data),
            name: data.name,
            gender: data.gender,
            birth_year: data.birth_year,
            eye_color: data.eye_color,
        }
    }
    _transformStarship = (data) => {
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
    }
    _transformPlanet = (data) => {
        return {
            id: this._extractId(data),
            name: data.name,
            population: data.population,
            rotation_period: data.rotation_period,
            diameter: data.diameter,
        }
    }
}
