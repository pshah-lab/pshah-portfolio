import handler from "../../../lib/darkmode/handler-darkmode-telemetry-delete.js";
import { toRoute } from "../../../lib/darkmode/nextAdapter.js";
export const dynamic = "force-dynamic";
export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = toRoute(handler);
