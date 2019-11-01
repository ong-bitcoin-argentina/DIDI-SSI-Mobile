import { ServiceCallAction } from "../services/ServiceStateStore";

import { ServiceSettingAction } from "./reducers/serviceSettingsReducer";
import { SessionAction } from "./reducers/sessionReducer";
import { TokenAction } from "./reducers/tokenReducer";

export type StoreAction = TokenAction | ServiceSettingAction | SessionAction | ServiceCallAction;
