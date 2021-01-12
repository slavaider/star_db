import {SwapiServiceConsumer} from "../components/swapi-service-context";
import React from "react";

export const withSwapi = (Wrapped) => {
    return (props) => (
        <SwapiServiceConsumer>
            {
                (swapi) => <Wrapped {...props} swapi={new swapi()}>{props.children}</Wrapped>
            }
        </SwapiServiceConsumer>
    )
}
