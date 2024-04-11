import { PluginDef } from '@fullcalendar/core';
import { Identity, Dictionary } from '@fullcalendar/core/internal';

declare const OPTION_REFINERS: {
    googleCalendarApiKey: StringConstructor;
};

declare const EVENT_SOURCE_REFINERS: {
    googleCalendarApiKey: StringConstructor;
    googleCalendarId: StringConstructor;
    googleCalendarApiBase: StringConstructor;
    extraParams: Identity<Dictionary | (() => Dictionary)>;
};

type ExtraOptionRefiners = typeof OPTION_REFINERS;
type ExtraEventSourceRefiners = typeof EVENT_SOURCE_REFINERS;
declare module '@fullcalendar/core/internal' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
}
declare module '@fullcalendar/core/internal' {
    interface EventSourceRefiners extends ExtraEventSourceRefiners {
    }
}
//# sourceMappingURL=ambient.d.ts.map

declare const _default: PluginDef;
//# sourceMappingURL=index.d.ts.map

export { _default as default };
