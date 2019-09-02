import { NavigationStackScreenOptions } from "react-navigation";

const style: NavigationStackScreenOptions = {
        headerStyle: {
                backgroundColor: '#4C63D1'
        }
}

export default function(extra: NavigationStackScreenOptions = {}): NavigationStackScreenOptions {
        return {...style, ...extra}
}