import { NavigationContainer, createStackNavigator } from "react-navigation";

import NavigationEnabledComponent from "./NavigationEnabledComponent"
import TypedObject from "../../util/TypedObject";

export interface NavigationEnabledComponentConstructor<Props, Navigation> {
        new (props: Readonly<Props>): NavigationEnabledComponent<Props, {}, Navigation>
}

type NavTree<Nav> = {
        [K in Extract<keyof Nav, string>]: NavMap<Nav[K]>
}

type AnyConstructor = NavigationEnabledComponentConstructor<{}, {}>

export default class NavMap<Props> {
        static from<T extends AnyConstructor>(
                constructor: T, 
                to: NavTree<NonNullable<InstanceType<T>['__navigationTypeReference']>>
        ) : NavMap<NonNullable<InstanceType<T>['__propTypeReference']>> {
                return new NavMap(constructor, TypedObject.values(to))
        }

        private current: AnyConstructor
        private rest: AnyConstructor[]

        private constructor(ctor: AnyConstructor, to: Array<NavMap<{}>>) {
                this.current = ctor
                this.rest = to
                        .map(navMap => navMap.values())
                        .reduce((curr, next) => curr.concat(next), [])
        }

        public navigator(): NavigationContainer {
                const spec: { [id: string]: AnyConstructor } = {}
                this.values().forEach(value => {
                        spec[value.name] = value
                })
                return createStackNavigator(spec, {
                        initialRouteName: this.current.name
                })
        }

        private values(): AnyConstructor[] {
                return [this.current].concat(this.rest)
        }
}
