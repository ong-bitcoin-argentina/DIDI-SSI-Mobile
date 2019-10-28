import { ServiceCallAction } from "../services/ServiceStateStore";

import { ServiceSettingAction } from "./reducers/serviceSettingsReducer";
import { TokenAction } from "./reducers/tokenReducer";

export type StoreAction = TokenAction | ServiceSettingAction | ServiceCallAction;
