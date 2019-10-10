import { DocumentAction } from "./reducers/documentReducer";
import { IdentityAction } from "./reducers/identityReducer";
import { RecentActivityAction } from "./reducers/recentActivityReducer";
import { SampleDocumentAction } from "./reducers/sampleDocumentReducer";

type StoreAction = DocumentAction | IdentityAction | RecentActivityAction | SampleDocumentAction;

export default StoreAction;
